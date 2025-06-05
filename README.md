# ⚡ ShopSyncer

ShopSyncer is a backend integration project for Shopify that allows merchants and developers to perform complete CRUD operations on Customers and Orders using the Shopify Admin GraphQL API. It also supports real-time webhook handling for order creation and pushes order data into a queue for background processing using RabbitMQ. MongoDB is used as the primary database for persisting customer and order data.

## 🚀 Features

- ✅ **Customer CRUD via Shopify GraphQL API**
- ✅ **Order CRUD via Shopify GraphQL API**
- ✅ **Draft order creation and confirmation**
- ✅ **Webhook listener for order creation events**
- ✅ **RabbitMQ queue integration to handle order data in the background**
- ✅ **MongoDB for persistent storage**
- ✅ **Postman-tested API endpoints**
- ✅ **HTTPS support with SSL certificates**

---

## 🧱 Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Backend     | Node.js + Express                   |
| Shopify API | Admin GraphQL API                   |
| Queue       | RabbitMQ (AMQP protocol)            |
| Database    | MongoDB                             |
| HTTPS       | Self-signed SSL (certs folder)      |
| Testing     | Postman                             |

---

## 📦 Folder Structure
```
shopSyncer/
├── certs/                 # SSL certificates (not committed)
├── graphql/               # GraphQL queries for Customer and Order
│   ├── customerQueries.js
│   └── orderQueries.js
├── queue/
│   └── consumer.js        # Consumes messages from RabbitMQ
├── middlewares/
│   └── validateOrder.js
├── models/
│   └── order.js
├── routes/
│   └── shopify.js         # All CRUD endpoints
├── webhooks/
│   └── orderCreateWebhook.js  # Webhook for order creation
├── .env                   # Environment variables (not committed)
├── .gitignore
├── index.js               # Main HTTPS server entry
├── package.json
└── README.md

```

---

## 📡 Webhook Flow

1. Shopify sends an `orders/create` event to `/webhooks/orders/create`.
2. The webhook is verified using HMAC SHA-256.
3. The verified payload is pushed to a RabbitMQ queue (`order_create_queue`).
4. The consumer (`queue/consumer.js`) listens to this queue and saves the order in MongoDB.

---

## 🔐 Security Practices

- `.env` and `certs/` are added to `.gitignore` to prevent accidental leakage.
- Webhooks are verified using HMAC and the shared `WEBHOOK_SECRET`.
- HTTPS server uses SSL for secure local testing.

---

## 🧪 Testing with Postman

- Use POST requests to test:
  - `/shopify/customer/create`, `/shopify/order/create`, etc.
  - Webhook endpoint: `/webhooks/orders/create` with raw `application/json` and proper HMAC header.
- You can generate HMAC using `generateHmac.js` with your payload and secret.

---

## 📌 Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/shopSyncer.git
   cd shopsyncer

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
npm install 
```
### 2. Create .env file
- SHOPIFY_STORE_URL=your-store.myshopify.com
- SHOPIFY_ACCESS_TOKEN=your-admin-api-token
- WEBHOOK_SECRET=your-webhook-secret

### 3. Start RabbitMQ locally

### 4. Run the consumer and server
```bash
node queue/consumer.js
node index.js
```
✍️ Author
Vinayak Mishra
