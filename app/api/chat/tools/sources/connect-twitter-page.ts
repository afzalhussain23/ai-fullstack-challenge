import { tool } from 'ai';
import { z } from 'zod';

export const connectTwitterPage = tool({
  description: `Connect to Twitter/X account and retrieve tweet performance, follower insights, and engagement data,
    IMPORTANT: This tool can be called WITHOUT any parameters to use demo data for testing/examples.
    Only provide parameters if connecting to a real Twitter/X account.`,
  inputSchema: z.object({
    username: z
      .string()
      .default('demostore')
      .describe('Twitter/X username (without @)'),
    access_token: z
      .string()
      .default('AAAAAAAAAAAAAAAAAAAAAxxxxxxxxx')
      .describe('Twitter API Bearer Token'),
    date_range: z
      .object({
        start_time: z.string().describe('Start time in ISO format'),
        end_time: z.string().describe('End time in ISO format'),
      })
      .default({
        start_time: '2024-01-01T00:00:00Z',
        end_time: '2024-01-31T23:59:59Z',
      })
      .optional(),
    metrics: z
      .array(z.string())
      .default(['public_metrics', 'organic_metrics', 'promoted_metrics'])
      .describe('Metrics to retrieve')
      .optional(),
  }),
  execute: async ({ username, access_token, date_range, metrics }) => {
    const twitterData = {
      account_info: {
        id: '123456789',
        username: username,
        name: 'Demo Store Official',
        description:
          'Your one-stop shop for the latest tech gadgets and accessories. Free shipping on orders over $50! 🛍️✨',
        public_metrics: {
          followers_count: 15847,
          following_count: 1234,
          tweet_count: 2847,
          listed_count: 89,
          like_count: 45672,
        },
        verified: true,
        profile_image_url: 'https://pbs.twimg.com/profile_images/example.jpg',
        url: 'https://t.co/example',
      },
      tweets: [
        {
          id: '1750234567890123456',
          text: '🚀 NEW ARRIVAL: Wireless Headphones Pro now available! Crystal clear sound, 30hr battery life, and noise cancellation. Limited time - 20% off! #TechDeals #Audio',
          created_at: '2024-01-20T14:30:00.000Z',
          author_id: '123456789',
          public_metrics: {
            retweet_count: 45,
            reply_count: 23,
            like_count: 234,
            quote_count: 12,
            bookmark_count: 67,
            impression_count: 8934,
          },
          organic_metrics: {
            impression_count: 7234,
            user_profile_clicks: 89,
            url_link_clicks: 156,
            retweet_count: 38,
            reply_count: 19,
            like_count: 198,
          },
          attachments: {
            media_keys: ['3_1750234567890123456'],
          },
          context_annotations: [
            {
              domain: {
                id: '65',
                name: 'Interests and Hobbies Vertical',
                description: 'A grouping of interests and hobbies entities',
              },
              entity: {
                id: '847618746741837824',
                name: 'Technology',
                description: 'Technology and computing',
              },
            },
          ],
        },
        {
          id: '1749876543210987654',
          text: 'Customer love! 💝 "Best purchase I made this year. Quality is outstanding and customer service is top-notch!" - Sarah M. We\'re grateful for amazing customers like you! 🙏 #CustomerLove #Review',
          created_at: '2024-01-18T10:15:00.000Z',
          author_id: '123456789',
          public_metrics: {
            retweet_count: 23,
            reply_count: 34,
            like_count: 456,
            quote_count: 8,
            bookmark_count: 34,
            impression_count: 12450,
          },
          organic_metrics: {
            impression_count: 11234,
            user_profile_clicks: 123,
            url_link_clicks: 45,
            retweet_count: 19,
            reply_count: 28,
            like_count: 389,
          },
        },
      ],
      audience_insights: {
        demographics: {
          age_groups: {
            '18-24': 22.5,
            '25-34': 38.7,
            '35-44': 24.8,
            '45-54': 10.3,
            '55+': 3.7,
          },
          gender: {
            male: 54.2,
            female: 45.8,
          },
        },
        interests: [
          { category: 'Technology', percentage: 67.8 },
          { category: 'Consumer Electronics', percentage: 54.3 },
          { category: 'Online Shopping', percentage: 48.9 },
          { category: 'Gaming', percentage: 35.2 },
          { category: 'Music', percentage: 29.8 },
        ],
        locations: [
          { country: 'US', percentage: 58.4 },
          { country: 'CA', percentage: 12.7 },
          { country: 'GB', percentage: 8.9 },
          { country: 'AU', percentage: 6.2 },
          { country: 'DE', percentage: 4.1 },
        ],
      },
      engagement_analytics: {
        total_impressions: 234567,
        total_engagements: 8934,
        engagement_rate: 3.81,
        link_clicks: 567,
        profile_visits: 234,
        mention_count: 89,
        hashtag_performance: [
          { hashtag: '#TechDeals', usage_count: 23, total_impressions: 45678 },
          {
            hashtag: '#CustomerLove',
            usage_count: 12,
            total_impressions: 23456,
          },
          { hashtag: '#NewArrival', usage_count: 8, total_impressions: 12345 },
        ],
      },
      conversation_insights: {
        mentions: [
          {
            id: '1750345678901234567',
            text: "@demostore just received my order and I'm blown away! The packaging is premium and the product quality exceeded my expectations 🔥",
            author: {
              username: 'techreviewer_mike',
              followers_count: 2345,
            },
            created_at: '2024-01-21T09:45:00.000Z',
            public_metrics: {
              like_count: 23,
              retweet_count: 5,
            },
          },
        ],
      },
    };

    return {
      status: 'success',
      username: username,
      data: twitterData,
      timestamp: new Date().toISOString(),
    };
  },
});
