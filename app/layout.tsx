import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Markopolo — AI Marketing Automation Platform',
    template: '%s | Markopolo AI',
  },
  description:
    'Conversational marketing automation platform to connect data sources (Shopify, CRM, Facebook Pixel) and generate targeted multi-channel campaigns (Email, SMS, WhatsApp, Ads).',
  keywords: [
    'marketing automation',
    'campaign builder',
    'shopify marketing',
    'crm segmentation',
    'facebook pixel',
    'email sms whatsapp ads',
    'perplexity-style chat',
  ],
  applicationName: 'Markopolo AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
