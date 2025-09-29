import { tool } from 'ai';
import { z } from 'zod';

export const connectGoogleAdsTag = tool({
  description: `Connect to Google Ads Tag and retrieve campaign performance, conversion tracking, and audience data,
    IMPORTANT: This tool can be called WITHOUT any parameters to use demo data for testing/examples.
    Only provide parameters if connecting to a real Google Ads Tag account.`,
  inputSchema: z.object({
    customer_id: z
      .string()
      .default('123-456-7890')
      .describe('Google Ads Customer ID'),
    developer_token: z
      .string()
      .default('ABcdeFGhijKLmnOP1234567890')
      .describe('Google Ads API developer token'),
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
    campaign_ids: z
      .array(z.string())
      .default(['12345678901', '12345678902'])
      .describe('Specific campaign IDs to retrieve')
      .optional(),
  }),
  execute: async ({
    customer_id,
    developer_token,
    access_token,
    date_range,
    campaign_ids,
  }) => {
    const googleAdsData = {
      customer_id: customer_id,
      account_info: {
        name: 'Demo Store Ads Account',
        currency: 'USD',
        timeZone: 'America/New_York',
        autoTaggingEnabled: true,
      },
      campaigns: [
        {
          id: '12345678901',
          name: 'Search - Brand Keywords',
          status: 'ENABLED',
          type: 'SEARCH',
          budget: {
            amount: 1000.0,
            period: 'DAILY',
          },
          bidding_strategy: 'TARGET_CPA',
          target_cpa: 25.0,
          performance: {
            impressions: 45230,
            clicks: 2847,
            ctr: 6.29,
            cost: 15670.5,
            cpc: 5.51,
            conversions: 234,
            conversion_rate: 8.22,
            cost_per_conversion: 66.97,
            conversion_value: 18450.0,
            roas: 1.18,
          },
        },
        {
          id: '12345678902',
          name: 'Shopping - All Products',
          status: 'ENABLED',
          type: 'SHOPPING',
          budget: {
            amount: 500.0,
            period: 'DAILY',
          },
          bidding_strategy: 'TARGET_ROAS',
          target_roas: 4.0,
          performance: {
            impressions: 78450,
            clicks: 1923,
            ctr: 2.45,
            cost: 8934.25,
            cpc: 4.65,
            conversions: 156,
            conversion_rate: 8.11,
            cost_per_conversion: 57.27,
            conversion_value: 23450.0,
            roas: 2.62,
          },
        },
      ],
      ad_groups: [
        {
          id: '987654321',
          name: 'Brand Terms',
          campaign_id: '12345678901',
          status: 'ENABLED',
          bid_amount: 3.5,
          performance: {
            impressions: 23450,
            clicks: 1547,
            cost: 7821.3,
            conversions: 127,
          },
        },
      ],
      keywords: [
        {
          id: '456789123',
          text: 'wireless headphones',
          match_type: 'PHRASE',
          ad_group_id: '987654321',
          status: 'ENABLED',
          quality_score: 8,
          performance: {
            impressions: 12450,
            clicks: 892,
            cost: 4234.5,
            conversions: 67,
            search_impression_share: 0.78,
          },
        },
      ],
      conversion_actions: [
        {
          id: '123456789',
          name: 'Purchase',
          category: 'PURCHASE',
          status: 'ENABLED',
          attribution_model: 'LAST_CLICK',
          count_type: 'ONE_PER_CLICK',
          conversion_window: 30,
          performance: {
            conversions: 234,
            conversion_value: 18450.0,
            cost_per_conversion: 66.97,
            conversion_rate: 8.22,
          },
        },
        {
          id: '123456790',
          name: 'Add to Cart',
          category: 'ADD_TO_CART',
          status: 'ENABLED',
          attribution_model: 'LAST_CLICK',
          count_type: 'EVERY',
          conversion_window: 1,
          performance: {
            conversions: 892,
            conversion_value: 0,
            cost_per_conversion: 18.45,
            conversion_rate: 31.35,
          },
        },
      ],
      audiences: [
        {
          id: '234567890',
          name: 'Website Visitors - Last 30 Days',
          type: 'REMARKETING',
          size: 15000,
          status: 'OPEN',
        },
        {
          id: '234567891',
          name: 'Purchasers - Last 180 Days',
          type: 'REMARKETING',
          size: 2500,
          status: 'OPEN',
        },
      ],
      demographics: {
        age_ranges: [
          { range: '18-24', impressions: 8934, clicks: 234, conversions: 12 },
          { range: '25-34', impressions: 18450, clicks: 892, conversions: 78 },
          { range: '35-44', impressions: 15230, clicks: 734, conversions: 89 },
          { range: '45-54', impressions: 9870, clicks: 445, conversions: 45 },
          { range: '55-64', impressions: 6234, clicks: 267, conversions: 23 },
        ],
        genders: [
          {
            gender: 'MALE',
            impressions: 28450,
            clicks: 1234,
            conversions: 123,
          },
          {
            gender: 'FEMALE',
            impressions: 30234,
            clicks: 1538,
            conversions: 124,
          },
        ],
      },
    };

    return {
      status: 'success',
      customer_id: customer_id,
      data: googleAdsData,
      timestamp: new Date().toISOString(),
    };
  },
});
