import { tool } from 'ai';
import { z } from 'zod';

export const connectFacebookPixel = tool({
  description: `Connect to Facebook Pixel and retrieve website visitor behavior and conversion data,
    IMPORTANT: This tool can be called WITHOUT any parameters to use demo data for testing/examples.
    Only provide parameters if connecting to a real Facebook Pixel account.`,
  inputSchema: z.object({
    pixel_id: z
      .string()
      .default('1234567890123456')
      .describe('Facebook Pixel ID'),
    access_token: z
      .string()
      .default('EAABwzLixnjYBAxxxxxxxx')
      .describe('Facebook Graph API access token'),
    date_range: z
      .object({
        since: z.string().describe('Start date in YYYY-MM-DD format'),
        until: z.string().describe('End date in YYYY-MM-DD format'),
      })
      .default({
        since: '2024-01-01',
        until: '2024-01-31',
      })
      .optional(),
    events: z
      .array(z.string())
      .default(['Purchase', 'AddToCart', 'ViewContent', 'InitiateCheckout'])
      .describe('Event types to retrieve')
      .optional(),
  }),
  execute: async ({ pixel_id, access_token, date_range, events }) => {
    const pixelData = {
      pixel_id: pixel_id,
      events: [
        {
          event_name: 'Purchase',
          event_time: '2024-01-20T14:30:00Z',
          user_data: {
            email: 'bob.norman@hostmail.com',
            phone: '+1234567890',
            client_ip_address: '192.168.1.1',
            client_user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
          custom_data: {
            currency: 'USD',
            value: 199.65,
            content_ids: ['632910392'],
            content_type: 'product',
            num_items: 2,
          },
          event_id: 'event.1234567890',
          event_source_url: 'https://mystore.com/checkout/success',
        },
        {
          event_name: 'AddToCart',
          event_time: '2024-01-20T15:45:00Z',
          user_data: {
            email: 'alice.smith@example.com',
            client_ip_address: '192.168.1.2',
            client_user_agent:
              'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
          },
          custom_data: {
            currency: 'USD',
            value: 149.99,
            content_ids: ['632910393'],
            content_type: 'product',
          },
          event_id: 'event.1234567891',
          event_source_url: 'https://mystore.com/products/wireless-headphones',
        },
      ],
      audience_insights: {
        total_events: 1247,
        unique_users: 892,
        demographics: {
          age_groups: {
            '18-24': 15.2,
            '25-34': 32.8,
            '35-44': 28.5,
            '45-54': 16.3,
            '55+': 7.2,
          },
          gender: {
            male: 48.7,
            female: 51.3,
          },
        },
        interests: [
          { name: 'Technology', percentage: 42.3 },
          { name: 'Fashion', percentage: 38.1 },
          { name: 'Sports', percentage: 29.6 },
        ],
        conversion_funnel: {
          page_view: 10000,
          add_to_cart: 850,
          initiate_checkout: 420,
          purchase: 118,
        },
      },
      custom_audiences: [
        {
          id: '23844370202530534',
          name: 'Website Visitors - Last 30 Days',
          size: 15000,
          retention_days: 30,
        },
        {
          id: '23844370202530535',
          name: 'Purchasers - Last 180 Days',
          size: 2500,
          retention_days: 180,
        },
      ],
    };

    return {
      status: 'success',
      pixel_id: pixel_id,
      data: pixelData,
      timestamp: new Date().toISOString(),
    };
  },
});
