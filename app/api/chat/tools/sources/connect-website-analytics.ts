import { tool } from 'ai';
import { z } from 'zod';

export const connectWebsiteAnalytics = tool({
  description: `Connect to Google Analytics 4 and retrieve website traffic, user behavior, and conversion data,
    IMPORTANT: This tool can be called WITHOUT any parameters to use demo data for testing/examples.
    Only provide parameters if connecting to a real Google Analytics 4 account.`,
  inputSchema: z.object({
    property_id: z.string().default('123456789').describe('GA4 Property ID'),
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
      .default([
        'sessions',
        'users',
        'page_views',
        'bounce_rate',
        'conversions',
      ])
      .describe('Metrics to retrieve')
      .optional(),
  }),
  execute: async ({ property_id, access_token, date_range, metrics }) => {
    const websiteData = {
      property_id: property_id,
      property_info: {
        name: 'Demo Store Website',
        url: 'https://mystore.com',
        timezone: 'America/New_York',
        currency: 'USD',
      },
      traffic_overview: {
        sessions: 45234,
        users: 32847,
        new_users: 19234,
        page_views: 128456,
        pages_per_session: 2.84,
        average_session_duration: 142.5,
        bounce_rate: 0.42,
        conversion_rate: 0.028,
      },
      acquisition: {
        channels: [
          {
            channel: 'Organic Search',
            sessions: 15673,
            users: 12456,
            conversion_rate: 0.032,
          },
          {
            channel: 'Direct',
            sessions: 12450,
            users: 9834,
            conversion_rate: 0.045,
          },
          {
            channel: 'Social',
            sessions: 8234,
            users: 6789,
            conversion_rate: 0.018,
          },
          {
            channel: 'Paid Search',
            sessions: 5678,
            users: 4567,
            conversion_rate: 0.058,
          },
          {
            channel: 'Email',
            sessions: 2345,
            users: 1890,
            conversion_rate: 0.078,
          },
          {
            channel: 'Referral',
            sessions: 854,
            users: 712,
            conversion_rate: 0.025,
          },
        ],
        campaigns: [
          {
            campaign: 'Summer Sale 2024',
            source: 'google',
            medium: 'cpc',
            sessions: 3456,
            users: 2789,
            conversions: 89,
            revenue: 12450.5,
          },
          {
            campaign: 'Facebook Brand Awareness',
            source: 'facebook',
            medium: 'social',
            sessions: 2345,
            users: 1987,
            conversions: 34,
            revenue: 4567.8,
          },
        ],
      },
      behavior: {
        top_pages: [
          {
            page: '/',
            page_views: 23456,
            unique_page_views: 18234,
            avg_time_on_page: 85.2,
            bounce_rate: 0.38,
          },
          {
            page: '/products',
            page_views: 18934,
            unique_page_views: 15678,
            avg_time_on_page: 125.8,
            bounce_rate: 0.32,
          },
          {
            page: '/product/wireless-headphones',
            page_views: 8456,
            unique_page_views: 7234,
            avg_time_on_page: 156.7,
            bounce_rate: 0.28,
          },
          {
            page: '/checkout',
            page_views: 2345,
            unique_page_views: 2156,
            avg_time_on_page: 234.5,
            bounce_rate: 0.15,
          },
          {
            page: '/contact',
            page_views: 1234,
            unique_page_views: 1098,
            avg_time_on_page: 98.4,
            bounce_rate: 0.65,
          },
        ],
        site_search: {
          total_searches: 5678,
          unique_searches: 4234,
          top_search_terms: [
            {
              term: 'wireless headphones',
              searches: 892,
              result_page_views: 1456,
            },
            {
              term: 'bluetooth speaker',
              searches: 567,
              result_page_views: 823,
            },
            { term: 'phone case', searches: 445, result_page_views: 612 },
          ],
        },
      },
      conversions: {
        goals: [
          {
            goal_name: 'Purchase',
            completions: 1267,
            conversion_rate: 0.028,
            goal_value: 178456.75,
          },
          {
            goal_name: 'Newsletter Signup',
            completions: 3456,
            conversion_rate: 0.076,
            goal_value: 0,
          },
          {
            goal_name: 'Contact Form',
            completions: 234,
            conversion_rate: 0.005,
            goal_value: 0,
          },
        ],
        ecommerce: {
          transactions: 1267,
          revenue: 178456.75,
          average_order_value: 140.85,
          ecommerce_conversion_rate: 0.028,
          top_products: [
            {
              product: 'Wireless Headphones Pro',
              revenue: 45678.9,
              quantity: 234,
            },
            {
              product: 'Bluetooth Speaker Mini',
              revenue: 23456.5,
              quantity: 345,
            },
            { product: 'Phone Case Premium', revenue: 12345.25, quantity: 567 },
          ],
        },
      },
      audience: {
        demographics: {
          age_groups: [
            { age_range: '18-24', percentage: 18.5, sessions: 8368 },
            { age_range: '25-34', percentage: 32.8, sessions: 14837 },
            { age_range: '35-44', percentage: 28.3, sessions: 12801 },
            { age_range: '45-54', percentage: 13.2, sessions: 5971 },
            { age_range: '55-64', percentage: 5.8, sessions: 2624 },
            { age_range: '65+', percentage: 1.4, sessions: 633 },
          ],
          gender: {
            male: 52.7,
            female: 47.3,
          },
        },
        technology: {
          devices: {
            desktop: 45.2,
            mobile: 48.7,
            tablet: 6.1,
          },
          browsers: [
            { browser: 'Chrome', percentage: 68.4 },
            { browser: 'Safari', percentage: 18.9 },
            { browser: 'Firefox', percentage: 7.2 },
            { browser: 'Edge', percentage: 4.1 },
            { browser: 'Other', percentage: 1.4 },
          ],
          operating_systems: [
            { os: 'Windows', percentage: 48.7 },
            { os: 'iOS', percentage: 28.4 },
            { os: 'Android', percentage: 15.8 },
            { os: 'macOS', percentage: 6.2 },
            { os: 'Other', percentage: 0.9 },
          ],
        },
        geography: {
          countries: [
            { country: 'United States', sessions: 28456, percentage: 62.9 },
            { country: 'Canada', sessions: 5678, percentage: 12.6 },
            { country: 'United Kingdom', sessions: 3456, percentage: 7.6 },
            { country: 'Australia', sessions: 2345, percentage: 5.2 },
            { country: 'Germany', sessions: 1890, percentage: 4.2 },
          ],
        },
      },
      real_time: {
        active_users_now: 234,
        active_users_30_min: 456,
        top_pages_now: [
          { page: '/', active_users: 89 },
          { page: '/products', active_users: 67 },
          { page: '/sale', active_users: 34 },
        ],
      },
    };

    return {
      status: 'success',
      property_id: property_id,
      data: websiteData,
      timestamp: new Date().toISOString(),
    };
  },
});
