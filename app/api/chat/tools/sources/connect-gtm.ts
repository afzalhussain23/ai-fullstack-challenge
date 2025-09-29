import { tool } from 'ai';
import { z } from 'zod';

export const connectGTM = tool({
  description: `Connect to Google Tag Manager and retrieve tag firing data, conversion tracking, and user behavior analytics,
    IMPORTANT: This tool can be called WITHOUT any parameters to use demo data for testing/examples.
    Only provide parameters if connecting to a real Google Tag Manager account.`,
  inputSchema: z.object({
    account_id: z.string().default('12345678').describe('GTM Account ID'),
    container_id: z.string().default('GTM-XXXXXX').describe('GTM Container ID'),
    access_token: z
      .string()
      .default('ya29.a0AWY7CknXXXXXXXXXXXXX')
      .describe('Google OAuth access token'),
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
    metrics: z
      .array(z.string())
      .default(['page_view', 'conversion', 'engagement', 'scroll_depth'])
      .describe('Metrics to retrieve')
      .optional(),
  }),
  execute: async ({
    account_id,
    container_id,
    access_token,
    date_range,
    metrics,
  }) => {
    const gtmData = {
      account_id: account_id,
      container_id: container_id,
      container_info: {
        name: 'Main Website Container',
        publicId: container_id,
        timeZoneCountryId: 'US',
        timeZoneId: 'America/New_York',
        notes: 'Primary GTM container for website tracking',
      },
      tags: [
        {
          tagId: '1',
          name: 'GA4 Configuration',
          type: 'gaawe',
          status: 'firing',
          fireCount: 15247,
          parameters: {
            measurementId: 'G-XXXXXXXXXX',
            configSettings: {
              custom_map: {
                dimension1: 'user_type',
                dimension2: 'product_category',
              },
            },
          },
        },
        {
          tagId: '2',
          name: 'Facebook Pixel Base Code',
          type: 'html',
          status: 'firing',
          fireCount: 14892,
          parameters: {
            pixelId: '1234567890123456',
          },
        },
        {
          tagId: '3',
          name: 'Purchase Conversion Tag',
          type: 'conversion_linker',
          status: 'firing',
          fireCount: 342,
          triggers: ['purchase_trigger'],
        },
      ],
      triggers: [
        {
          triggerId: '4',
          name: 'Page View - All Pages',
          type: 'pageview',
          status: 'active',
          conditions: [
            {
              type: 'equals',
              parameter: '{{Page URL}}',
              value: '.*',
            },
          ],
          fireCount: 15247,
        },
        {
          triggerId: '5',
          name: 'Purchase Trigger',
          type: 'customEvent',
          status: 'active',
          conditions: [
            {
              type: 'equals',
              parameter: '{{Event}}',
              value: 'purchase',
            },
          ],
          fireCount: 342,
        },
      ],
      dataLayer_events: [
        {
          event: 'page_view',
          timestamp: '2024-01-20T14:30:00Z',
          page_title: 'Home Page',
          page_location: 'https://mystore.com/',
          user_properties: {
            user_type: 'returning',
            device_category: 'desktop',
          },
          custom_parameters: {
            content_group1: 'homepage',
            engagement_time_msec: 45000,
          },
        },
        {
          event: 'purchase',
          timestamp: '2024-01-20T14:35:00Z',
          transaction_id: 'T12345',
          value: 199.99,
          currency: 'USD',
          items: [
            {
              item_id: 'SKU123',
              item_name: 'Wireless Headphones',
              category: 'Electronics',
              quantity: 1,
              price: 199.99,
            },
          ],
          user_properties: {
            customer_ltv: 450.0,
            purchase_count: 3,
          },
        },
      ],
      variables: [
        {
          variableId: '6',
          name: 'GA4 Measurement ID',
          type: 'c',
          value: 'G-XXXXXXXXXX',
        },
        {
          variableId: '7',
          name: 'Enhanced Ecommerce - Purchase',
          type: 'dataLayer',
          dataLayerVariable: 'ecommerce',
        },
      ],
      analytics: {
        total_page_views: 15247,
        unique_users: 8934,
        conversion_events: 342,
        conversion_rate: 3.83,
        top_pages: [
          { page: '/', views: 4521, unique_users: 3247 },
          { page: '/products', views: 2847, unique_users: 1982 },
          { page: '/checkout', views: 892, unique_users: 731 },
        ],
        device_breakdown: {
          desktop: 52.3,
          mobile: 41.7,
          tablet: 6.0,
        },
        traffic_sources: {
          organic: 34.2,
          direct: 28.1,
          social: 18.4,
          paid: 12.8,
          email: 6.5,
        },
      },
    };

    return {
      status: 'success',
      container_id: container_id,
      data: gtmData,
      timestamp: new Date().toISOString(),
    };
  },
});
