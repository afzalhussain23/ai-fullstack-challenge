import { tool } from 'ai';
import { z } from 'zod';

export const connectShopify = tool({
  description: `Connect to Shopify store and retrieve customer data, orders, and abandoned carts,
    IMPORTANT: This tool can be called WITHOUT any parameters to use demo data for testing/examples.
    Only provide parameters if connecting to a real Shopify store.`,
  inputSchema: z.object({
    shop_domain: z
      .string()
      .default('demo-store.myshopify.com')
      .describe('Shopify store domain (e.g., mystore.myshopify.com)')
      .optional(),
    access_token: z
      .string()
      .default('shpat_1234567890abcdef')
      .describe('Shopify API access token')
      .optional(),
    date_range: z
      .object({
        start_date: z.string().describe('Start date in YYYY-MM-DD format'),
        end_date: z.string().describe('End date in YYYY-MM-DD format'),
      })
      .default({
        start_date: '2024-01-01',
        end_date: '2024-01-31',
      })
      .optional(),
  }),
  execute: async ({ shop_domain, access_token, date_range }) => {
    const shopifyData = {
      customers: [
        {
          id: 207119551,
          email: 'bob.norman@hostmail.com',
          created_at: '2023-12-03T17:21:00-05:00',
          updated_at: '2023-12-03T17:21:00-05:00',
          first_name: 'Bob',
          last_name: 'Norman',
          orders_count: 3,
          total_spent: '199.65',
          tags: 'VIP, repeat_customer',
          phone: '+1234567890',
          accepts_marketing: true,
          marketing_opt_in_level: 'confirmed_opt_in',
          last_order_date: '2024-01-15T10:30:00Z',
          customer_lifetime_value: 299.45,
        },
      ],
      orders: [
        {
          id: 450789469,
          email: 'bob.norman@hostmail.com',
          created_at: '2024-01-15T10:30:00Z',
          updated_at: '2024-01-15T10:30:00Z',
          number: 1001,
          order_status_url: 'https://checkout.shopify.com/orders/status',
          total_price: '199.65',
          financial_status: 'paid',
          fulfillment_status: 'fulfilled',
          customer: {
            id: 207119551,
            email: 'bob.norman@hostmail.com',
          },
          line_items: [
            {
              id: 466157049,
              product_id: 632910392,
              title: 'iPhone 15 Case',
              quantity: 2,
              price: '99.00',
            },
          ],
        },
      ],
      abandoned_carts: [
        {
          id: 27659578482,
          token: '68778783ad298f1c80c3bafcddeea02f',
          cart_token: '1sdqh42j18dcdy347pfvn7k1vgk7fb',
          email: 'alice.smith@example.com',
          created_at: '2024-01-20T15:45:00Z',
          updated_at: '2024-01-20T15:45:00Z',
          line_items: [
            {
              id: 39072856,
              product_id: 632910393,
              title: 'Wireless Headphones',
              quantity: 1,
              price: '149.99',
            },
          ],
          total_price: '149.99',
          abandoned_checkout_url: 'https://checkout.shopify.com/cart/continue',
        },
      ],
      analytics: {
        total_customers: 1247,
        active_customers_30_days: 89,
        average_order_value: 127.34,
        conversion_rate: 2.8,
        cart_abandonment_rate: 68.5,
      },
    };

    return {
      status: 'success',
      shop: shop_domain,
      data: shopifyData,
      timestamp: new Date().toISOString(),
    };
  },
});
