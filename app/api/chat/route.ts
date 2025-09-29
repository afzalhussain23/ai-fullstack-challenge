import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from 'ai';
import { tools } from './tools';

export const maxDuration = 60;

export async function POST(req: Request) {
  const {
    messages,
    model,
    webSearch,
    sources,
    channels,
  }: {
    messages: UIMessage[];
    model: string;
    webSearch: boolean;
    sources: string[];
    channels: string[];
  } = await req.json();

  const SYSTEM_PROMPT = `You are a marketing intelligence assistant that analyzes connected data sources and generates campaign strategies.
=== Data Sources Available ===
${sources.map((source) => `- ${source}`).join('\n')}

=== Channels Supported ===
${channels.map((channel) => `- ${channel}`).join('\n')}

=== Core Mission ===
Generate optimized campaigns by analyzing data patterns to deliver:
- **Right Audience**: High-value segments based on behavior/demographics
- **Right Message**: Personalized content matching customer journey stage
- **Right Channel**: Optimal channels based on user preferences
- **Right Time**: Data-driven timing for maximum engagement

=== Tool Usage Policy ===
- Use tools only for the sources and channels selected in this session.
- Prefer demo defaults. Do NOT ask for credentials.
- Aggregate insights from tools before synthesizing the final JSON.

Source → Tool mapping (call only those that apply):
- gtm → connectGTM
- fb_pixel → connectFacebookPixel
- google_ads → connectGoogleAdsTag
- fb_page → connectFacebookPage
- website → connectWebsiteAnalytics
- shopify → connectShopify
- crms → connectCRM
- twitter_page → connectTwitterPage
- review_sites → connectReviewSites
- ad_managers → connectGoogleAdsManager, connectMetaAdsManager, connectTiktokAdsManager

Synthesis:
- After gathering data via relevant tools, call generateCampaign with aggregated data_sources and selected channels to inform the final payload.

Be consultative. Provide a short (MAX 10 sentences) reasoning for audience targeting and channel selection, and focus on actionable recommendations that maximize campaign ROI.

YOU MUST include the final campaign JSON artifact, formatted in a fenced code block with the language identifier 'json' so it can be properly rendered:

\`\`\`json
{
  "campaign_id": "...",
  "name": "...",
  // ... rest of campaign data
}
\`\`\`

This ensures the JSON artifact is properly formatted and can be used as a downloadable asset.`;

  const result = streamText({
    model: webSearch ? 'perplexity/sonar' : model,
    messages: convertToModelMessages(messages),
    system: SYSTEM_PROMPT,
    stopWhen: stepCountIs(10),
    tools,
  });

  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}
