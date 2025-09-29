import { tool } from 'ai';
import { z } from 'zod';

export const connectCRM = tool({
  description: `Connect to CRM system and retrieve customer profiles, lifecycle stages, and engagement history,
    IMPORTANT: This tool can be called WITHOUT any parameters to use demo data for testing/examples.
    Only provide parameters if connecting to a real CRM system.`,
  inputSchema: z.object({
    crm_type: z
      .enum(['salesforce', 'hubspot', 'pipedrive'])
      .default('salesforce')
      .describe('Type of CRM system'),
    api_key: z
      .string()
      .default('00D000000000000EAA')
      .describe('CRM API key or access token'),
    instance_url: z
      .string()
      .default('https://mycompany.my.salesforce.com')
      .describe('CRM instance URL')
      .optional(),
    filters: z
      .object({
        date_range: z
          .object({
            start_date: z.string(),
            end_date: z.string(),
          })
          .default({
            start_date: '2024-01-01',
            end_date: '2024-01-31',
          })
          .optional(),
        lifecycle_stage: z
          .array(z.string())
          .default([
            'lead',
            'marketing_qualified_lead',
            'sales_qualified_lead',
            'customer',
          ])
          .optional(),
        lead_score_min: z.number().default(0).optional(),
      })
      .default({
        date_range: {
          start_date: '2024-01-01',
          end_date: '2024-01-31',
        },
        lifecycle_stage: [
          'lead',
          'marketing_qualified_lead',
          'sales_qualified_lead',
          'customer',
        ],
        lead_score_min: 0,
      })
      .optional(),
  }),
  execute: async ({ crm_type, api_key, instance_url, filters }) => {
    const crmData = {
      contacts: [
        {
          id: '003XX000004TMM2',
          email: 'bob.norman@hostmail.com',
          firstName: 'Bob',
          lastName: 'Norman',
          phone: '+1234567890',
          company: 'Norman Industries',
          jobTitle: 'Marketing Director',
          lifecycleStage: 'customer',
          leadScore: 85,
          createdDate: '2023-12-01T10:30:00Z',
          lastModifiedDate: '2024-01-20T14:30:00Z',
          lastActivityDate: '2024-01-20T14:30:00Z',
          properties: {
            totalRevenue: 1250.0,
            dealCount: 3,
            lastPurchaseDate: '2024-01-15T10:30:00Z',
            marketingQualifiedDate: '2023-12-15T09:00:00Z',
            salesQualifiedDate: '2023-12-20T11:00:00Z',
          },
          customFields: {
            industry: 'Technology',
            companySize: '51-200',
            preferredChannel: 'email',
          },
        },
        {
          id: '003XX000004TMM3',
          email: 'alice.smith@example.com',
          firstName: 'Alice',
          lastName: 'Smith',
          phone: '+1987654321',
          company: 'Smith Corp',
          jobTitle: 'CEO',
          lifecycleStage: 'marketing_qualified_lead',
          leadScore: 72,
          createdDate: '2024-01-18T16:45:00Z',
          lastModifiedDate: '2024-01-20T15:45:00Z',
          lastActivityDate: '2024-01-20T15:45:00Z',
          properties: {
            totalRevenue: 0,
            dealCount: 0,
            marketingQualifiedDate: '2024-01-19T10:30:00Z',
          },
          customFields: {
            industry: 'Healthcare',
            companySize: '11-50',
            preferredChannel: 'phone',
          },
        },
      ],
      deals: [
        {
          id: '006XX000001Q2hD',
          name: 'Norman Industries - Q1 Package',
          amount: 5000.0,
          stage: 'Closed Won',
          probability: 100,
          closeDate: '2024-01-15',
          contactId: '003XX000004TMM2',
          createdDate: '2023-12-20T11:00:00Z',
        },
      ],
      activities: [
        {
          id: '00TXX0000012345',
          type: 'email_open',
          contactId: '003XX000004TMM2',
          subject: 'Special Offer - 20% Off',
          timestamp: '2024-01-20T14:30:00Z',
          details: {
            campaignId: '701XX0000008glQ',
            emailId: 'a1bXX0000005BcD',
          },
        },
        {
          id: '00TXX0000012346',
          type: 'website_visit',
          contactId: '003XX000004TMM3',
          subject: 'Product Page Visit',
          timestamp: '2024-01-20T15:45:00Z',
          details: {
            url: 'https://mystore.com/products/wireless-headphones',
            duration: 180,
          },
        },
      ],
      segments: [
        {
          id: 'seg_001',
          name: 'High-Value Customers',
          criteria: "totalRevenue > 1000 AND lifecycleStage = 'customer'",
          contactCount: 245,
        },
        {
          id: 'seg_002',
          name: 'Hot Leads',
          criteria:
            "leadScore > 70 AND lifecycleStage = 'marketing_qualified_lead'",
          contactCount: 89,
        },
      ],
      analytics: {
        totalContacts: 5247,
        totalDeals: 892,
        conversionRates: {
          visitor_to_lead: 12.5,
          lead_to_mql: 28.3,
          mql_to_sql: 45.7,
          sql_to_customer: 23.8,
        },
        averageDealSize: 2847.5,
      },
    };

    return {
      status: 'success',
      crm_type: crm_type,
      data: crmData,
      timestamp: new Date().toISOString(),
    };
  },
});
