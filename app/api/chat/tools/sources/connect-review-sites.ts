import { tool } from 'ai';
import { z } from 'zod';

export const connectReviewSites = tool({
  description: `Connect to review platforms and retrieve customer reviews, ratings, and sentiment data,
    IMPORTANT: This tool can be called WITHOUT any parameters to use demo data for testing/examples.
    Only provide parameters if connecting to a real review platforms account.`,
  inputSchema: z.object({
    platforms: z
      .array(z.enum(['google', 'yelp', 'trustpilot', 'facebook']))
      .default(['google', 'trustpilot'])
      .describe('Review platforms to connect'),
    business_id: z
      .string()
      .default('ChIJN1t_tDeuEmsRUsoyG83frY4')
      .describe('Business ID or place ID'),
    api_keys: z
      .object({
        google: z.string().default('AIzaSyXXXXXXXXXXXXXXXXXXXXXX').optional(),
        yelp: z.string().default('Bearer XXXXXXXXXXXXXXXX').optional(),
        trustpilot: z.string().default('XXXXXXXXXXXXXXXX').optional(),
      })
      .default({
        google: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXX',
        trustpilot: 'XXXXXXXXXXXXXXXX',
      })
      .optional(),
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
  }),
  execute: async ({ platforms, business_id, api_keys, date_range }) => {
    const reviewsData = {
      business_info: {
        name: 'Demo Store',
        address: '123 Main St, New York, NY 10001',
        phone: '+1234567890',
        website: 'https://mystore.com',
        categories: ['Electronics Store', 'Mobile Phone Shop'],
      },
      google_reviews: platforms.includes('google')
        ? {
            place_id: business_id,
            rating: 4.6,
            user_ratings_total: 1247,
            reviews: [
              {
                author_name: 'John Smith',
                author_url: 'https://www.google.com/maps/contrib/123456789',
                profile_photo_url:
                  'https://lh3.googleusercontent.com/a/example',
                rating: 5,
                relative_time_description: '2 weeks ago',
                text: 'Excellent service and fast delivery! The wireless headphones I bought work perfectly and the sound quality is amazing. Highly recommended!',
                time: 1705734000,
                language: 'en',
              },
              {
                author_name: 'Sarah Johnson',
                author_url: 'https://www.google.com/maps/contrib/234567890',
                profile_photo_url:
                  'https://lh3.googleusercontent.com/a/example2',
                rating: 4,
                relative_time_description: '1 week ago',
                text: 'Good selection of products and competitive prices. Customer service was helpful when I had questions about my order. Will shop again.',
                time: 1706338800,
                language: 'en',
              },
              {
                author_name: 'Mike Davis',
                author_url: 'https://www.google.com/maps/contrib/345678901',
                profile_photo_url:
                  'https://lh3.googleusercontent.com/a/example3',
                rating: 3,
                relative_time_description: '3 days ago',
                text: 'Product quality is good but shipping took longer than expected. Package arrived safely though.',
                time: 1706857200,
                language: 'en',
              },
            ],
            rating_distribution: {
              '5_star': 68.2,
              '4_star': 18.7,
              '3_star': 8.4,
              '2_star': 2.9,
              '1_star': 1.8,
            },
          }
        : null,
      trustpilot_reviews: platforms.includes('trustpilot')
        ? {
            business_unit_id: '5f8c9a2b1c9d440001234567',
            display_name: 'Demo Store',
            trust_score: 4.3,
            number_of_reviews: 892,
            reviews: [
              {
                id: '61a1b2c3d4e5f6789012345',
                consumer: {
                  display_name: 'Emma Wilson',
                  country_code: 'US',
                },
                stars: 5,
                title: 'Outstanding customer experience!',
                text: "I've been shopping with Demo Store for over a year now and they never disappoint. Fast shipping, great prices, and excellent customer support. The wireless earbuds I recently bought are fantastic!",
                created_at: '2024-01-18T14:30:00Z',
                updated_at: '2024-01-18T14:30:00Z',
                language: 'en',
                company_reply: {
                  text: "Thank you so much for your kind words, Emma! We're thrilled to hear about your positive experience and that you're happy with your wireless earbuds. Your loyalty means the world to us!",
                  created_at: '2024-01-19T09:15:00Z',
                },
              },
              {
                id: '62b2c3d4e5f67890123456',
                consumer: {
                  display_name: 'David Chen',
                  country_code: 'CA',
                },
                stars: 4,
                title: 'Great products, room for improvement in delivery',
                text: 'The phone case I ordered is exactly as described and the quality is excellent. However, the delivery took a bit longer than expected. Overall satisfied with the purchase.',
                created_at: '2024-01-15T10:45:00Z',
                updated_at: '2024-01-15T10:45:00Z',
                language: 'en',
              },
            ],
            trust_score_breakdown: {
              excellent: 54.3,
              great: 23.8,
              average: 12.5,
              poor: 6.2,
              bad: 3.2,
            },
          }
        : null,
      yelp_reviews: platforms.includes('yelp')
        ? {
            id: 'demo-store-new-york',
            name: 'Demo Store',
            rating: 4.5,
            review_count: 156,
            reviews: [
              {
                id: 'abc123def456',
                user: {
                  id: 'user123',
                  name: 'Lisa M.',
                  image_url:
                    'https://s3-media0.fl.yelpcdn.com/photo/example.jpg',
                },
                rating: 5,
                text: "Love this place! They have all the latest tech gadgets and the staff is super knowledgeable. Bought a Bluetooth speaker here and it's been working perfectly for months.",
                time_created: '2024-01-20T16:20:00Z',
                url: 'https://www.yelp.com/biz/demo-store-new-york?hrid=abc123def456',
              },
            ],
          }
        : null,
      sentiment_analysis: {
        overall_sentiment: 'positive',
        sentiment_scores: {
          positive: 72.4,
          neutral: 18.9,
          negative: 8.7,
        },
        common_themes: {
          positive: [
            { theme: 'product_quality', mentions: 234, sentiment_score: 0.85 },
            { theme: 'customer_service', mentions: 189, sentiment_score: 0.78 },
            { theme: 'fast_delivery', mentions: 156, sentiment_score: 0.82 },
            {
              theme: 'competitive_prices',
              mentions: 123,
              sentiment_score: 0.76,
            },
          ],
          negative: [
            { theme: 'shipping_delays', mentions: 45, sentiment_score: -0.67 },
            { theme: 'packaging_issues', mentions: 23, sentiment_score: -0.54 },
            { theme: 'return_process', mentions: 12, sentiment_score: -0.72 },
          ],
        },
        keywords: [
          { keyword: 'quality', frequency: 345, sentiment: 0.82 },
          { keyword: 'fast', frequency: 234, sentiment: 0.78 },
          { keyword: 'excellent', frequency: 189, sentiment: 0.92 },
          { keyword: 'recommended', frequency: 167, sentiment: 0.88 },
        ],
      },
      review_trends: {
        monthly_ratings: [
          { month: '2024-01', avg_rating: 4.7, review_count: 89 },
          { month: '2023-12', avg_rating: 4.5, review_count: 92 },
          { month: '2023-11', avg_rating: 4.6, review_count: 78 },
        ],
        response_rate: 85.4,
        average_response_time_hours: 8.5,
      },
    };

    return {
      status: 'success',
      business_id: business_id,
      platforms: platforms,
      data: reviewsData,
      timestamp: new Date().toISOString(),
    };
  },
});
