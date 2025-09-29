import type { ToolSet } from 'ai';
import { connectCRM } from './sources/connect-crm';
import { connectFacebookPage } from './sources/connect-facebook-page';
import { connectFacebookPixel } from './sources/connect-facebook-pixel';
import { connectGoogleAdsManager } from './sources/connect-google-ads-manager';
import { connectGoogleAdsTag } from './sources/connect-google-ads-tag';
import { connectGTM } from './sources/connect-gtm';
import { connectMetaAdsManager } from './sources/connect-meta-ads-manager';
import { connectReviewSites } from './sources/connect-review-sites';
import { connectShopify } from './sources/connect-shopify';
import { connectTiktokAdsManager } from './sources/connect-tiktok-ads-manager';
import { connectTwitterPage } from './sources/connect-twitter-page';
import { connectWebsiteAnalytics } from './sources/connect-website-analytics';
import { generateCampaign } from './sources/generate-campaign';

export const tools = {
  connectGTM,
  connectFacebookPixel,
  connectGoogleAdsTag,
  connectFacebookPage,
  connectWebsiteAnalytics,
  connectShopify,
  connectCRM,
  connectTwitterPage,
  connectReviewSites,
  connectMetaAdsManager,
  connectGoogleAdsManager,
  connectTiktokAdsManager,
  generateCampaign,
} satisfies ToolSet;
