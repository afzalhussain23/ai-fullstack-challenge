import { tool } from 'ai';
import { z } from 'zod';

export const connectGoogleAdsManager = tool({
  description: `Manage Google Ads campaigns, keywords, ad groups, and performance optimization,
    IMPORTANT: This tool can be called WITHOUT any parameters to use demo data for testing/examples.
    Only provide parameters if connecting to a real Google Ads campaigns account.`,
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
    action: z
      .enum([
        'create_campaign',
        'update_keywords',
        'optimize_bids',
        'get_performance',
        'create_ad_group',
        'pause_campaign',
        'budget_management',
      ])
      .describe('Action to perform'),
    campaign_data: z
      .object({
        campaign_id: z.string().optional().describe('Existing campaign ID'),
        name: z
          .string()
          .default('New Google Ads Campaign')
          .describe('Campaign name'),
        campaign_type: z
          .enum(['SEARCH', 'SHOPPING', 'DISPLAY', 'VIDEO', 'PERFORMANCE_MAX'])
          .default('SEARCH')
          .describe('Campaign type'),
        budget: z.number().default(50).describe('Daily budget in USD'),
        bidding_strategy: z
          .enum([
            'MANUAL_CPC',
            'TARGET_CPA',
            'TARGET_ROAS',
            'MAXIMIZE_CONVERSIONS',
          ])
          .default('TARGET_CPA')
          .describe('Bidding strategy'),
        target_cpa: z.number().optional().describe('Target CPA in USD'),
        target_roas: z.number().optional().describe('Target ROAS percentage'),
        keywords: z
          .array(
            z.object({
              text: z.string(),
              match_type: z
                .enum(['EXACT', 'PHRASE', 'BROAD'])
                .default('PHRASE'),
              max_cpc: z.number().optional(),
            }),
          )
          .optional(),
        locations: z
          .array(z.string())
          .default(['United States'])
          .describe('Geographic targeting'),
        languages: z
          .array(z.string())
          .default(['en'])
          .describe('Language targeting'),
      })
      .optional(),
  }),
  execute: async ({
    customer_id,
    developer_token,
    access_token,
    action,
    campaign_data,
  }) => {
    const campaignId =
      campaign_data?.campaign_id ||
      `${Math.floor(Math.random() * 10000000000)}`;

    switch (action) {
      case 'create_campaign':
        return {
          status: 'success',
          action: 'create_campaign',
          data: {
            campaign_id: campaignId,
            name: campaign_data?.name || 'New Google Ads Campaign',
            type: campaign_data?.campaign_type || 'SEARCH',
            status: 'ACTIVE',
            budget: {
              daily_budget_micros: (campaign_data?.budget || 50) * 1000000,
              period: 'DAILY',
            },
            bidding_strategy: {
              type: campaign_data?.bidding_strategy || 'TARGET_CPA',
              target_cpa_micros: campaign_data?.target_cpa
                ? campaign_data.target_cpa * 1000000
                : 25000000,
            },
            targeting: {
              locations: campaign_data?.locations || ['United States'],
              languages: campaign_data?.languages || ['en'],
            },
            ad_groups: [
              {
                id: `${campaignId}001`,
                name: 'Ad Group 1',
                status: 'ENABLED',
                cpc_bid_micros: 2500000,
              },
            ],
          },
          message: `Google Ads ${campaign_data?.campaign_type || 'SEARCH'} campaign created successfully`,
          timestamp: new Date().toISOString(),
        };

      case 'get_performance':
        return {
          status: 'success',
          action: 'get_performance',
          data: {
            campaign_id: campaignId,
            performance_metrics: {
              impressions: 45230,
              clicks: 2847,
              ctr: 6.29,
              cost_micros: 15670500000,
              average_cpc_micros: 5510000,
              conversions: 234,
              conversion_rate: 8.22,
              cost_per_conversion_micros: 66970000,
              conversion_value_micros: 18450000000,
              value_per_conversion: 78.85,
              roas: 1.18,
              search_impression_share: 0.72,
              search_rank_lost_impression_share: 0.15,
            },
            keyword_performance: [
              {
                keyword: 'wireless headphones',
                match_type: 'PHRASE',
                impressions: 12450,
                clicks: 892,
                ctr: 7.17,
                cost_micros: 4234500000,
                conversions: 67,
                quality_score: 8,
              },
              {
                keyword: 'bluetooth speakers',
                match_type: 'EXACT',
                impressions: 8934,
                clicks: 623,
                ctr: 6.97,
                cost_micros: 2847300000,
                conversions: 41,
                quality_score: 9,
              },
            ],
          },
          timestamp: new Date().toISOString(),
        };

      case 'optimize_bids':
        return {
          status: 'success',
          action: 'optimize_bids',
          data: {
            campaign_id: campaignId,
            optimization_results: {
              keywords_optimized: 15,
              bid_adjustments: [
                {
                  keyword: 'wireless headphones',
                  old_bid_micros: 2500000,
                  new_bid_micros: 3200000,
                  reason: 'High conversion rate, low impression share',
                },
                {
                  keyword: 'cheap headphones',
                  old_bid_micros: 1800000,
                  new_bid_micros: 1200000,
                  reason: 'Low quality score, high cost per conversion',
                },
              ],
              projected_impact: {
                impression_increase: 12.5,
                click_increase: 8.3,
                conversion_increase: 15.2,
                cost_efficiency_improvement: 9.7,
              },
            },
          },
          message:
            'Bid optimization completed for 15 keywords based on performance data',
          timestamp: new Date().toISOString(),
        };

      default:
        return {
          status: 'success',
          action: action,
          data: {
            campaign_id: campaignId,
            message: `${action} completed successfully`,
          },
          timestamp: new Date().toISOString(),
        };
    }
  },
});
