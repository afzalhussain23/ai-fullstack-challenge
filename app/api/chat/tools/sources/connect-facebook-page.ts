import { tool } from 'ai';
import { z } from 'zod';

export const connectFacebookPage = tool({
  description: `Connect to Facebook Page and retrieve page insights, post performance, and audience engagement data,
    IMPORTANT: This tool can be called WITHOUT any parameters to use demo data for testing/examples.
    Only provide parameters if connecting to a real Facebook Page account.`,
  inputSchema: z.object({
    page_id: z.string().default('123456789012345').describe('Facebook Page ID'),
    access_token: z
      .string()
      .default('EAABwzLixnjYBAxxxxxxxx')
      .describe('Facebook Page Access Token'),
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
    metrics: z
      .array(z.string())
      .default([
        'page_impressions',
        'page_reach',
        'page_engagement',
        'post_performance',
      ])
      .describe('Metrics to retrieve')
      .optional(),
  }),
  execute: async ({ page_id, access_token, date_range, metrics }) => {
    const facebookPageData = {
      page_id: page_id,
      page_info: {
        name: 'Demo Store Official',
        category: 'Retail Company',
        followers_count: 25847,
        likes_count: 24532,
        verification_status: 'verified',
        website: 'https://mystore.com',
        phone: '+1234567890',
        location: {
          city: 'New York',
          country: 'United States',
          zip: '10001',
        },
      },
      page_insights: [
        {
          name: 'page_impressions',
          period: 'day',
          values: [
            {
              value: 15234,
              end_time: '2024-01-20T08:00:00+0000',
            },
            {
              value: 18567,
              end_time: '2024-01-21T08:00:00+0000',
            },
          ],
          title: 'Daily Total Impressions',
          description:
            "Daily: The number of times any content from your Page or about your Page entered a person's screen",
        },
        {
          name: 'page_reach',
          period: 'day',
          values: [
            {
              value: 8934,
              end_time: '2024-01-20T08:00:00+0000',
            },
            {
              value: 10245,
              end_time: '2024-01-21T08:00:00+0000',
            },
          ],
          title: 'Daily Total Reach',
          description:
            'Daily: The number of people who had any content from your Page or about your Page enter their screen',
        },
        {
          name: 'page_engagement',
          period: 'day',
          values: [
            {
              value: 1247,
              end_time: '2024-01-20T08:00:00+0000',
            },
            {
              value: 1534,
              end_time: '2024-01-21T08:00:00+0000',
            },
          ],
          title: 'Daily Total Page Engagement',
          description: 'Daily: The number of people who engaged with your Page',
        },
      ],
      posts: [
        {
          id: '123456789012345_987654321098765',
          created_time: '2024-01-20T14:30:00+0000',
          message:
            'Check out our latest wireless headphones! 🎧 Perfect sound quality for music lovers. Limited time offer - 20% off!',
          type: 'photo',
          status_type: 'mobile_status_update',
          permalink_url:
            'https://www.facebook.com/demostore/posts/987654321098765',
          insights: {
            post_impressions: 8934,
            post_reach: 6234,
            post_engagement: 567,
            post_clicks: 234,
            reactions: {
              like: 234,
              love: 89,
              wow: 12,
              haha: 5,
              sad: 2,
              angry: 1,
            },
            shares: 45,
            comments: 23,
          },
          attachments: {
            data: [
              {
                type: 'photo',
                url: 'https://scontent.facebook.com/v/photo.jpg',
              },
            ],
          },
        },
        {
          id: '123456789012345_876543210987654',
          created_time: '2024-01-18T10:15:00+0000',
          message:
            "Customer testimonial: 'Best purchase I've made this year! The quality is outstanding and delivery was super fast.' ⭐⭐⭐⭐⭐",
          type: 'status',
          status_type: 'added_photos',
          permalink_url:
            'https://www.facebook.com/demostore/posts/876543210987654',
          insights: {
            post_impressions: 12450,
            post_reach: 9234,
            post_engagement: 892,
            post_clicks: 145,
            reactions: {
              like: 456,
              love: 234,
              wow: 23,
              haha: 8,
              sad: 1,
              angry: 0,
            },
            shares: 67,
            comments: 34,
          },
        },
      ],
      audience_insights: {
        demographics: {
          age_gender: [
            { age_range: '18-24', gender: 'male', percentage: 8.5 },
            { age_range: '18-24', gender: 'female', percentage: 12.3 },
            { age_range: '25-34', gender: 'male', percentage: 18.7 },
            { age_range: '25-34', gender: 'female', percentage: 22.1 },
            { age_range: '35-44', gender: 'male', percentage: 15.2 },
            { age_range: '35-44', gender: 'female', percentage: 16.8 },
          ],
        },
        locations: [
          { country: 'US', percentage: 65.4 },
          { country: 'CA', percentage: 12.8 },
          { country: 'GB', percentage: 8.3 },
          { country: 'AU', percentage: 6.2 },
        ],
        devices: {
          desktop: 34.5,
          mobile: 58.7,
          tablet: 6.8,
        },
      },
      messaging_insights: {
        total_conversations: 234,
        response_rate: 95.7,
        average_response_time: 145,
        blocked_conversations: 3,
      },
    };

    return {
      status: 'success',
      page_id: page_id,
      data: facebookPageData,
      timestamp: new Date().toISOString(),
    };
  },
});
