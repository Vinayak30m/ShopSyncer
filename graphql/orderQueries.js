module.exports = {
  // Fetch order by ID
  getOrder: `
    query GetOrder($id: ID!) {
      order(id: $id) {
        id
        name
        email
        createdAt
        totalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        lineItems(first: 10) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                price
                compareAtPrice
              }
            }
          }
        }
        shippingAddress {
          name
          address1
          city
          province
          country
          zip
        }
      }
    }
  `,

  // Shopify doesn't support direct order updates; this remains mostly useful for tags/notes
  updateOrder: `
    mutation UpdateOrder($input: OrderInput!) {
      orderUpdate(input: $input) {
        order {
          id
          email
          note
          tags
        }
        userErrors {
          field
          message
        }
      }
    }
  `,

  // Close an order
  closeOrder: `
    mutation CloseOrder($id: ID!) {
      orderClose(id: $id) {
        order {
          id
          closed
        }
        userErrors {
          field
          message
        }
      }
    }
  `,

  // Cancel an order
  cancelOrder: `
    mutation CancelOrder($id: ID!, $reason: OrderCancelReason!) {
      orderCancel(id: $id, reason: $reason) {
        order {
          id
          cancelled
          cancelReason
        }
        userErrors {
          field
          message
        }
      }
    }
  `,

  // Create order via Draft Order
   draftOrderCreate: `
    mutation CreateDraftOrder($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
          invoiceUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `,
  draftOrderComplete: `
    mutation CompleteDraftOrder($id: ID!) {
      draftOrderComplete(id: $id) {
        draftOrder {
          id
          completedAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `,
};
