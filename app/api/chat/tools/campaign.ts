import { tool } from 'ai';
import { z } from 'zod';

export const generateCampaign = tool({
  description: `Generate a targeted marketing campaign based on connected data sources and selected channels,
    IMPORTANT: This tool can be called WITHOUT any parameters to use demo data for testing/examples.
    Only provide parameters if connecting to a real marketing campaign account.`,
  inputSchema: z.object({
    data_sources: z
      .array(
        z.object({
          type: z.enum(['shopify', 'facebook_pixel', 'crm']),
          data: z.any().describe('Data from the connected source'),
        }),
      )
      .default([
        {
          type: 'shopify',
          data: { customers: [], orders: [], abandoned_carts: [] },
        },
      ]),
    channels: z
      .array(z.enum(['email', 'sms', 'push', 'whatsapp']))
      .default(['email', 'sms']),
    campaign_objective: z
      .enum(['retention', 'acquisition', 'conversion', 'engagement'])
      .default('conversion'),
    budget: z.number().default(1000).optional(),
    duration_days: z.number().default(14).optional(),
  }),
  execute: async ({
    data_sources,
    channels,
    campaign_objective,
    budget,
    duration_days,
  }) => {
    const campaignId = `camp_${Date.now()}`;

    const campaign = {
      campaign_id: campaignId,
      name: `${campaign_objective.charAt(0).toUpperCase() + campaign_objective.slice(1)} Campaign`,
      objective: campaign_objective,
      status: 'draft',
      created_at: new Date().toISOString(),
      budget: budget || 1000,
      duration_days: duration_days || 14,
      audience_segments: [
        {
          id: 'seg_high_value',
          name: 'High-Value Customers',
          size: 245,
          criteria: {
            shopify_data: 'total_spent > 150',
            crm_data: 'leadScore > 80',
            pixel_data: 'purchase_events > 0',
          },
          priority: 1,
        },
        {
          id: 'seg_cart_abandoners',
          name: 'Cart Abandoners',
          size: 89,
          criteria: {
            shopify_data: 'abandoned_cart_within_24h = true',
            pixel_data: 'add_to_cart_no_purchase = true',
          },
          priority: 2,
        },
      ],
      channels: channels.reduce(
        (acc, channel) => {
          acc[channel] = {
            enabled: true,
            message_templates: {
              high_value: {
                subject:
                  channel === 'email' ? 'Exclusive Offer Just for You!' : null,
                content: `Hi {{first_name}}, as one of our valued customers, enjoy 15% off your next purchase!`,
                cta: 'Shop Now',
                personalization: [
                  'first_name',
                  'last_purchase',
                  'preferred_category',
                ],
              },
              cart_abandoners: {
                subject:
                  channel === 'email' ? "Don't forget your items!" : null,
                content: `Hi {{first_name}}, you left {{item_count}} item(s) in your cart. Complete your purchase now!`,
                cta: 'Complete Purchase',
                personalization: ['first_name', 'item_count', 'cart_value'],
              },
            },
            schedule: {
              send_time: '09:00',
              timezone: 'UTC',
              frequency: 'once',
            },
          };
          return acc;
        },
        {} as Record<string, any>,
      ),
      triggers: {
        immediate: [
          {
            condition: 'cart_abandoned_1h',
            action: 'send_cart_recovery',
            channels: ['email', 'sms'],
          },
        ],
        scheduled: [
          {
            condition: 'high_value_customer',
            action: 'send_exclusive_offer',
            schedule: 'weekly_friday_9am',
            channels: ['email', 'push'],
          },
        ],
      },
      personalization: {
        dynamic_content: {
          product_recommendations: true,
          location_based_offers: true,
          behavioral_triggers: true,
        },
        merge_fields: [
          'first_name',
          'last_name',
          'total_spent',
          'last_purchase_date',
        ],
        content_variants: {
          subject_lines: 3,
          email_templates: 2,
          cta_buttons: 2,
        },
      },
      tracking: {
        conversion_goals: ['purchase', 'email_click', 'website_visit'],
        attribution_window: 7,
        utm_parameters: {
          source: 'campaign',
          medium: 'email',
          campaign: campaignId,
        },
      },
      expected_results: {
        estimated_reach: 334,
        estimated_ctr: 3.2,
        estimated_conversion_rate: 2.8,
        estimated_revenue: 2340.5,
      },
    };

    return {
      status: 'success',
      campaign: campaign,
      message: `Campaign "${campaign.name}" has been generated successfully with ${channels.length} channels and ${campaign.audience_segments.length} audience segments.`,
      timestamp: new Date().toISOString(),
    };
  },
});
