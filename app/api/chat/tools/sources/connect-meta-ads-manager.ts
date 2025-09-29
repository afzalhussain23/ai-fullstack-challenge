import { tool } from 'ai';
import { z } from 'zod';

export const connectMetaAdsManager = tool({
  description: `Manage Meta (Facebook/Instagram) advertising campaigns, create ads, optimize budgets, and track performance,
    IMPORTANT: This tool can be called WITHOUT any parameters to use demo data for testing/examples.
    Only provide parameters if connecting to a real Meta (Facebook/Instagram) advertising campaigns account.`,
  inputSchema: z.object({
    account_id: z
      .string()
      .default('act_123456789')
      .describe('Meta Ads Account ID'),
    access_token: z
      .string()
      .default('EAABwzLixnjYBAxxxxxxxx')
      .describe('Meta Graph API access token'),
    action: z
      .enum([
        'create_campaign',
        'update_campaign',
        'pause_campaign',
        'get_insights',
        'optimize_budget',
        'create_adset',
        'create_ad',
      ])
      .describe('Action to perform'),
    campaign_data: z
      .object({
        campaign_id: z
          .string()
          .optional()
          .describe('Existing campaign ID for updates'),
        name: z.string().default('New Meta Campaign').describe('Campaign name'),
        objective: z
          .enum([
            'AWARENESS',
            'TRAFFIC',
            'ENGAGEMENT',
            'LEADS',
            'APP_PROMOTION',
            'SALES',
          ])
          .default('SALES')
          .describe('Campaign objective'),
        status: z
          .enum(['ACTIVE', 'PAUSED', 'DELETED'])
          .default('ACTIVE')
          .optional(),
        budget: z
          .object({
            daily_budget: z
              .number()
              .optional()
              .describe('Daily budget in cents'),
            lifetime_budget: z
              .number()
              .optional()
              .describe('Lifetime budget in cents'),
          })
          .optional(),
        targeting: z
          .object({
            age_min: z.number().default(18),
            age_max: z.number().default(65),
            genders: z
              .array(z.enum(['1', '2']))
              .default(['1', '2'])
              .describe('1=male, 2=female'),
            geo_locations: z
              .object({
                countries: z.array(z.string()).default(['US']),
                regions: z.array(z.string()).optional(),
                cities: z.array(z.string()).optional(),
              })
              .optional(),
            interests: z
              .array(z.string())
              .optional()
              .describe('Interest targeting IDs'),
            behaviors: z
              .array(z.string())
              .optional()
              .describe('Behavior targeting IDs'),
            custom_audiences: z
              .array(z.string())
              .optional()
              .describe('Custom audience IDs'),
          })
          .optional(),
        placements: z
          .array(
            z.enum([
              'facebook_feeds',
              'instagram_feed',
              'instagram_stories',
              'facebook_stories',
              'messenger_inbox',
              'audience_network',
            ]),
          )
          .default(['facebook_feeds', 'instagram_feed'])
          .optional(),
      })
      .optional(),
  }),
  execute: async ({ account_id, access_token, action, campaign_data }) => {
    const campaignId =
      campaign_data?.campaign_id ||
      `23846370202530${Math.floor(Math.random() * 1000)}`;

    switch (action) {
      case 'create_campaign':
        return {
          status: 'success',
          action: 'create_campaign',
          data: {
            campaign_id: campaignId,
            name: campaign_data?.name || 'New Meta Campaign',
            objective: campaign_data?.objective || 'SALES',
            status: 'ACTIVE',
            account_id: account_id,
            created_time: new Date().toISOString(),
            daily_budget: campaign_data?.budget?.daily_budget || 5000,
            targeting: {
              age_range: `${campaign_data?.targeting?.age_min || 18}-${campaign_data?.targeting?.age_max || 65}`,
              locations: campaign_data?.targeting?.geo_locations?.countries || [
                'US',
              ],
              audience_size: 2500000,
            },
            delivery_info: {
              status: 'active',
              can_show_creative_status_breakdown: true,
            },
          },
          message: `Meta campaign "${campaign_data?.name || 'New Meta Campaign'}" created successfully with ID: ${campaignId}`,
          timestamp: new Date().toISOString(),
        };

      case 'get_insights':
        return {
          status: 'success',
          action: 'get_insights',
          data: {
            campaign_id: campaignId,
            insights: {
              impressions: 125640,
              clicks: 3247,
              ctr: 2.58,
              spend: 847.32,
              cpc: 0.26,
              cpp: 6.74,
              cpm: 17.39,
              reach: 98470,
              frequency: 1.28,
              conversions: 89,
              conversion_rate: 2.74,
              cost_per_conversion: 9.52,
              roas: 4.23,
              video_views: 15890,
              video_view_rate: 68.3,
              engagement_rate: 4.7,
            },
            breakdown: {
              by_platform: {
                facebook: { spend: 432.18, conversions: 52, roas: 4.45 },
                instagram: { spend: 415.14, conversions: 37, roas: 3.98 },
              },
              by_placement: {
                feed: { spend: 678.9, conversions: 71, roas: 4.32 },
                stories: { spend: 168.42, conversions: 18, roas: 3.87 },
              },
              by_age_gender: [
                {
                  age: '25-34',
                  gender: 'female',
                  spend: 234.56,
                  conversions: 31,
                },
                {
                  age: '35-44',
                  gender: 'male',
                  spend: 189.23,
                  conversions: 24,
                },
              ],
            },
          },
          timestamp: new Date().toISOString(),
        };

      case 'optimize_budget':
        return {
          status: 'success',
          action: 'optimize_budget',
          data: {
            campaign_id: campaignId,
            optimization_results: {
              current_daily_budget: 5000,
              recommended_daily_budget: 6500,
              reason:
                'Campaign is performing well with ROAS of 4.23, increasing budget could drive 30% more conversions',
              budget_allocation: {
                high_performing_adsets: 70,
                medium_performing_adsets: 25,
                low_performing_adsets: 5,
              },
              expected_improvement: {
                additional_conversions: 27,
                projected_roas: 4.15,
              },
            },
          },
          message:
            'Budget optimization completed. Recommended 30% budget increase based on strong performance.',
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
