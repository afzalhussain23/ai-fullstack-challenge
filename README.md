## Perplexity-style Marketing Automation
[Live preview](https://ai-fullstack-challenge.vercel.app/)

A chat interface similar to Perplexity that serves as a marketing automation platform. The system should help users create targeted campaigns by connecting data sources and selecting communication channels.

---

## Environment Variables
Create a `.env.local` file in the project root (you can `cp .env.local.example .env.local` if an example exists) and add the following keys:

```env
# https://vercel.com/afzalhussain23s-projects/~/ai/api-keys
AI_GATEWAY_API_KEY=
```

---

## Quick Start
```bash
bun install
bun dev
```
Open `http://localhost:3000`.

---

## How to Use
1) Connect data sources (simulated): Shopify, Facebook Pixel, CRM
2) Pick channels: Email, SMS, WhatsApp, Ads
3) Ask the chat to generate a campaign JSON

---

## Demo Video
- [Watch the demo](https://drive.google.com/file/d/1bQVEWK3yyV4Oybvv6jHQvZcVvz-6ifX_/view?usp=sharing)

---

## Code Pointers
- API orchestration: `app/api/chat/route.ts`
- Tools & sources: `app/api/chat/tools/` and `app/api/chat/tools/sources/`
- UI entry: `app/page.tsx`

---

## License
MIT
