import { tool } from 'ai';
import { z } from 'zod';

const ALL_CHANNELS = [
  'email',
  'sms',
  'push',
  'whatsapp',
  'voice',
  'messenger',
  'ads',
] as const;

type Channel = (typeof ALL_CHANNELS)[number];

type ChannelConfig = {
  enabled: boolean;
  schedule: { send_time: string; timezone: string; frequency: string };
  message_templates?: Record<string, unknown>;
};

const getTemplates = (channel: Channel): Record<string, unknown> => {
  switch (channel) {
    case 'email':
      return {
        high_value: {
          subject: 'Exclusive Offer Just for You!',
          content:
            'Hi {{first_name}}, as one of our valued customers, enjoy 15% off your next purchase!',
          cta: 'Shop Now',
        },
        cart_abandoners: {
          subject: "Don't forget your items!",
          content:
            'Hi {{first_name}}, you left {{item_count}} item(s) in your cart. Complete your purchase now!',
          cta: 'Complete Purchase',
        },
      };
    case 'sms':
    case 'whatsapp':
      return {
        high_value: {
          content:
            'Hi {{first_name}}, thanks for being a VIP! 15% off your next order: {{short_link}}',
          cta: 'Shop Now',
        },
        cart_abandoners: {
          content:
            'Hi {{first_name}}, you left {{item_count}} item(s). Complete here: {{short_link}}',
          cta: 'Resume Checkout',
        },
      };
    case 'push':
      return {
        high_value: {
          title: 'VIP Offer Inside',
          content: 'Enjoy 15% off your next purchase!',
          cta: 'Open App',
        },
        cart_abandoners: {
          title: 'Items Waiting',
          content: 'Complete your purchase now',
          cta: 'Resume',
        },
      };
    case 'messenger':
      return {
        high_value: {
          content: 'Hey {{first_name}}, want 15% off your next order?',
          quick_replies: ['View Offer', 'Not now'],
        },
        cart_abandoners: {
          content: 'You left items in your cart. Want a quick checkout link?',
          quick_replies: ['Send Link', 'Later'],
        },
      };
    case 'voice':
      return {
        high_value: {
          script:
            'Hello {{first_name}}, enjoy 15% off your next purchase. Press 1 to hear featured items.',
        },
        cart_abandoners: {
          script:
            'Hello {{first_name}}, items were left in your cart. Press 1 to get a checkout link by SMS.',
        },
      };
    case 'ads':
      return {
        high_value: {
          headline: 'VIP Savings Await',
          primary_text: 'Enjoy 15% off today',
          cta: 'Shop Now',
        },
        cart_abandoners: {
          headline: 'Complete Your Order',
          primary_text: 'Your items are waiting',
          cta: 'Buy Now',
        },
      };
    default:
      return {};
  }
};

export const generateCampaign = tool({
  description: `Generate a targeted marketing campaign based on connected data sources and selected channels. If no params are provided, demo defaults will be used.`,
  inputSchema: z.object({
    data_sources: z
      .array(
        z.object({
          type: z.enum([
            'gtm',
            'fb_pixel',
            'google_ads',
            'fb_page',
            'website',
            'shopify',
            'crms',
            'twitter_page',
            'review_sites',
            'ad_managers',
          ]),
          data: z.any().describe('Data from the connected source'),
        }),
      )
      .default([
        {
          type: 'shopify',
          data: { customers: [], orders: [], abandoned_carts: [] },
        },
        {
          type: 'fb_pixel',
          data: { events: [], purchases: [], add_to_carts: [] },
        },
        { type: 'crms', data: { contacts: [], leadScores: [], stages: [] } },
      ]),
    channels: z
      .array(z.enum(ALL_CHANNELS))
      .default(['email', 'sms', 'push', 'whatsapp']),
    campaign_objective: z.enum([
      'retention',
      'acquisition',
      'conversion',
      'engagement',
    ]),
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
            schedule: {
              send_time: '09:00',
              timezone: 'UTC',
              frequency: 'once',
            },
            message_templates: getTemplates(channel),
          };
          return acc;
        },
        {} as Partial<Record<Channel, ChannelConfig>>,
      ),
      triggers: {
        immediate: [
          {
            condition: 'cart_abandoned_1h',
            action: 'send_cart_recovery',
            channels: channels,
          },
        ],
        scheduled: [
          {
            condition: 'high_value_customer',
            action: 'send_exclusive_offer',
            schedule: 'weekly_friday_9am',
            channels: channels,
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
          campaign: campaignId,
        },
      },
      sources_used: data_sources.map((s) => s.type),
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
