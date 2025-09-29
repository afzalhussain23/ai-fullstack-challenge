import { tool } from 'ai';
import { z } from 'zod';

export const connectTiktokAdsManager = tool({
  description: `Manage TikTok advertising campaigns, create video ads, and track performance metrics,
    IMPORTANT: This tool can be called WITHOUT any parameters to use demo data for testing/examples.
    Only provide parameters if connecting to a real TikTok advertising campaigns account.`,
  inputSchema: z.object({
    advertiser_id: z
      .string()
      .default('1234567890123456789')
      .describe('TikTok Advertiser ID'),
    access_token: z
      .string()
      .default('tiktok_access_token_xxxxx')
      .describe('TikTok Marketing API access token'),
    action: z
      .enum([
        'create_campaign',
        'create_adgroup',
        'create_ad',
        'get_insights',
        'optimize_creative',
        'audience_analysis',
      ])
      .describe('Action to perform'),
    campaign_data: z
      .object({
        campaign_id: z.string().optional().describe('Existing campaign ID'),
        name: z
          .string()
          .default('New TikTok Campaign')
          .describe('Campaign name'),
        objective: z
          .enum([
            'REACH',
            'TRAFFIC',
            'VIDEO_VIEWS',
            'CONVERSIONS',
            'APP_PROMOTION',
            'LEAD_GENERATION',
          ])
          .default('CONVERSIONS')
          .describe('Campaign objective'),
        budget: z.number().default(100).describe('Daily budget in USD'),
        targeting: z
          .object({
            age_groups: z
              .array(
                z.enum(['13-17', '18-24', '25-34', '35-44', '45-54', '55+']),
              )
              .default(['18-24', '25-34']),
            genders: z
              .array(z.enum(['MALE', 'FEMALE', 'UNLIMITED']))
              .default(['UNLIMITED']),
            locations: z.array(z.string()).default(['US']),
            interests: z.array(z.string()).optional(),
            behaviors: z.array(z.string()).optional(),
          })
          .optional(),
        creative_type: z
          .enum(['SINGLE_IMAGE', 'SINGLE_VIDEO', 'CAROUSEL', 'SPARK_AD'])
          .default('SINGLE_VIDEO')
          .optional(),
        video_duration: z
          .enum(['9-15s', '16-30s', '31-60s'])
          .default('16-30s')
          .optional(),
      })
      .optional(),
  }),
  execute: async ({ advertiser_id, access_token, action, campaign_data }) => {
    const campaignId =
      campaign_data?.campaign_id ||
      `tiktokcamp${Math.floor(Math.random() * 1000000)}`;

    switch (action) {
      case 'create_campaign':
        return {
          status: 'success',
          action: 'create_campaign',
          data: {
            campaign_id: campaignId,
            advertiser_id: advertiser_id,
            name: campaign_data?.name || 'New TikTok Campaign',
            objective: campaign_data?.objective || 'CONVERSIONS',
            status: 'ENABLE',
            budget: campaign_data?.budget || 100,
            targeting: {
              age_groups: campaign_data?.targeting?.age_groups || [
                '18-24',
                '25-34',
              ],
              genders: campaign_data?.targeting?.genders || ['UNLIMITED'],
              locations: campaign_data?.targeting?.locations || ['US'],
              estimated_audience_size: 5200000,
            },
            optimization_goal: 'COMPLETE_PAYMENT',
            bid_type: 'BID_TYPE_AUTO',
            created_time: new Date().toISOString(),
          },
          message: `TikTok ${campaign_data?.objective || 'CONVERSIONS'} campaign created successfully`,
          timestamp: new Date().toISOString(),
        };

      case 'get_insights':
        return {
          status: 'success',
          action: 'get_insights',
          data: {
            campaign_id: campaignId,
            performance_metrics: {
              impressions: 245680,
              clicks: 12340,
              ctr: 5.02,
              spend: 1234.56,
              cpc: 0.1,
              cpm: 5.02,
              reach: 198450,
              frequency: 1.24,
              video_views: 189450,
              video_view_rate: 77.1,
              video_watched_2s: 156780,
              video_watched_6s: 98450,
              average_video_play: 12.4,
              conversions: 145,
              conversion_rate: 1.17,
              cost_per_conversion: 8.52,
              roas: 3.85,
            },
            demographic_breakdown: {
              by_age: {
                '13-17': { impressions: 24568, spend: 123.45, conversions: 8 },
                '18-24': { impressions: 98272, spend: 493.82, conversions: 58 },
                '25-34': { impressions: 73704, spend: 370.41, conversions: 52 },
                '35-44': { impressions: 36852, spend: 185.32, conversions: 21 },
              },
              by_gender: {
                MALE: { impressions: 122840, spend: 617.28, conversions: 72 },
                FEMALE: { impressions: 122840, spend: 617.28, conversions: 73 },
              },
            },
            creative_insights: {
              top_performing_videos: [
                {
                  video_id: 'v123456',
                  duration: '15s',
                  completion_rate: 68.3,
                  engagement_rate: 8.7,
                  share_rate: 2.1,
                },
              ],
            },
          },
          timestamp: new Date().toISOString(),
        };

      case 'optimize_creative':
        return {
          status: 'success',
          action: 'optimize_creative',
          data: {
            campaign_id: campaignId,
            creative_analysis: {
              best_performing_elements: {
                video_duration: '15-30 seconds optimal',
                opening_hook: 'Product demo in first 3 seconds',
                call_to_action: 'Shop Now performs 23% better than Learn More',
                music_type: 'Trending audio increases engagement by 15%',
              },
              recommendations: [
                {
                  type: 'video_format',
                  suggestion:
                    'Use vertical 9:16 format for 40% better performance',
                  impact: 'high',
                },
                {
                  type: 'creative_refresh',
                  suggestion:
                    'Refresh creative assets every 7 days to prevent fatigue',
                  impact: 'medium',
                },
                {
                  type: 'user_generated_content',
                  suggestion: 'Incorporate UGC for 25% higher trust scores',
                  impact: 'high',
                },
              ],
              creative_fatigue_analysis: {
                frequency_cap_reached: false,
                performance_decline: 5.2,
                refresh_recommended: true,
              },
            },
          },
          message:
            'Creative optimization analysis completed with actionable recommendations',
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
