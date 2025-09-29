=== Product Requirements Document
## Task Overview
You need to create a **chat interface similar to Perplexity** that serves as a marketing automation platform. The system should help users create targeted campaigns by connecting data sources and selecting communication channels.

## Key Components

### 1. Chat Interface
- Similar to Perplexity's conversational UI
- Users can interact naturally to set up campaigns
- Should guide users through the process of connecting data sources and selecting channels

### 2. Data Source Integration (Choose 3)
From the list: GTM, Facebook Pixel, Google Ads Tag, Facebook Page, Website, Shopify, CRMs, Twitter Page, Review Sites, Ad Managers
- You need to **simulate** connections to 3 of these
- Each should provide different types of customer/audience data
- Examples:
  - **Shopify**: Customer purchase history, abandoned carts
  - **Facebook Pixel**: Website visitor behavior, conversion tracking
  - **CRM**: Customer profiles, lifecycle stage, engagement history

### 3. Channel Selection (Choose 4)
From: Email, SMS, Push, WhatsApp, Voice, Messenger, Ads
- Users can select which channels to use for their campaign
- Each channel should have different capabilities and message formats

### 4. Campaign Generation
The system should output a **JSON payload** that represents:
- **Right Time**: When to send the message (timing/triggers)
- **Right Channel**: Which communication method to use
- **Right Message**: Personalized content for the audience
- **Right Audience**: Target segments based on connected data