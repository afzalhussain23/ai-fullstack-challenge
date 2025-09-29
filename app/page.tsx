'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import {
  BellIcon,
  CopyIcon,
  DatabaseIcon,
  FacebookIcon,
  GlobeIcon,
  MailIcon,
  MegaphoneIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  MessageSquareMoreIcon,
  MonitorIcon,
  PhoneIcon,
  ShoppingCartIcon,
  StarIcon,
  TagIcon,
  TargetIcon,
  TrendingUpIcon,
  TwitterIcon,
} from 'lucide-react';
import { Fragment, useState } from 'react';
import { Action, Actions } from '@/components/ai-elements/actions';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Loader } from '@/components/ai-elements/loader';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Response } from '@/components/ai-elements/response';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources';
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@/components/ai-elements/tool';
import { MultiSelect } from '@/components/ui/multi-select';

const models = [
  {
    name: 'GPT 4o Mini',
    value: 'openai/gpt-4o-mini',
  },
  {
    name: 'Deepseek R1',
    value: 'deepseek/deepseek-r1',
  },
];

const sources = [
  { value: 'gtm', label: 'GTM', icon: TagIcon },
  { value: 'fb_pixel', label: 'Facebook Pixel', icon: TargetIcon },
  { value: 'google_ads', label: 'Google Ads Tag', icon: TrendingUpIcon },
  { value: 'fb_page', label: 'Facebook Page', icon: FacebookIcon },
  { value: 'website', label: 'Website', icon: MonitorIcon },
  { value: 'shopify', label: 'Shopify', icon: ShoppingCartIcon },
  { value: 'crms', label: 'CRMs', icon: DatabaseIcon },
  { value: 'twitter_page', label: 'Twitter Page', icon: TwitterIcon },
  { value: 'review_sites', label: 'Review Sites', icon: StarIcon },
  { value: 'ad_managers', label: 'Ad Managers', icon: MegaphoneIcon },
];

const channels = [
  { value: 'email', label: 'Email', icon: MailIcon },
  { value: 'sms', label: 'SMS', icon: MessageSquareIcon },
  { value: 'push', label: 'Push', icon: BellIcon },
  { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircleIcon },
  { value: 'voice', label: 'Voice', icon: PhoneIcon },
  { value: 'messenger', label: 'Messenger', icon: MessageSquareMoreIcon },
  { value: 'ads', label: 'Ads', icon: TrendingUpIcon },
];

const ChatBotDemo = () => {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage(
      {
        text: message.text || 'Sent with attachments',
        files: message.files,
      },
      {
        body: {
          model: model,
          webSearch: webSearch,
          sources: selectedSources,
          channels: selectedChannels,
        },
      },
    );
    setInput('');
  };

  return (
    <div className='max-w-4xl mx-auto p-6 relative size-full h-screen'>
      <div className='flex flex-col h-full'>
        <Conversation className='h-full'>
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.id}>
                {message.role === 'assistant' &&
                  message.parts.filter((part) => part.type === 'source-url')
                    .length > 0 && (
                    <Sources>
                      <SourcesTrigger
                        count={
                          message.parts.filter(
                            (part) => part.type === 'source-url',
                          ).length
                        }
                      />
                      {message.parts
                        .filter((part) => part.type === 'source-url')
                        .map((part, i) => (
                          <SourcesContent key={`${message.id}-${i}`}>
                            <Source
                              key={`${message.id}-${i}`}
                              href={part.url}
                              title={part.url}
                            />
                          </SourcesContent>
                        ))}
                    </Sources>
                  )}
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return (
                        <Fragment key={`${message.id}-${i}`}>
                          <Message from={message.role}>
                            <MessageContent>
                              <Response>{part.text}</Response>
                            </MessageContent>
                          </Message>
                          {message.role === 'assistant' &&
                            i === messages.length - 1 && (
                              <Actions className='mt-2'>
                                <Action
                                  onClick={() =>
                                    navigator.clipboard.writeText(part.text)
                                  }
                                  label='Copy'
                                >
                                  <CopyIcon className='size-3' />
                                </Action>
                              </Actions>
                            )}
                        </Fragment>
                      );
                    case 'reasoning':
                      return (
                        <Reasoning
                          key={`${message.id}-${i}`}
                          className='w-full'
                          isStreaming={
                            status === 'streaming' &&
                            i === message.parts.length - 1 &&
                            message.id === messages.at(-1)?.id
                          }
                        >
                          <ReasoningTrigger />
                          <ReasoningContent>{part.text}</ReasoningContent>
                        </Reasoning>
                      );
                    case `tool-connectShopify`:
                    case `tool-connectGTM`:
                    case `tool-connectFacebookPixel`:
                    case `tool-connectGoogleAdsTag`:
                    case `tool-connectFacebookPage`:
                    case `tool-connectWebsiteAnalytics`:
                    case `tool-connectCRM`:
                    case `tool-connectTwitterPage`:
                    case `tool-connectReviewSites`:
                    case `tool-connectMetaAdsManager`:
                    case `tool-connectGoogleAdsManager`:
                    case `tool-connectTiktokAdsManager`:
                      return (
                        <Tool key={`${message.id}-${i}`}>
                          <ToolHeader type={part.type} state={part.state} />
                          <ToolContent>
                            <ToolInput input={part.input} />
                            <ToolOutput
                              output={part.output}
                              errorText={part.errorText}
                            />
                          </ToolContent>
                        </Tool>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            ))}
            {status === 'submitted' && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput
          onSubmit={handleSubmit}
          className='mt-4'
          globalDrop
          multiple
        >
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </PromptInputBody>
          <PromptInputToolbar>
            <PromptInputTools>
              {/*attachments*/}
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
              {/*web search*/}
              <PromptInputButton
                variant={webSearch ? 'default' : 'ghost'}
                onClick={() => setWebSearch(!webSearch)}
              >
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton>
              {/*model selection*/}
              <PromptInputModelSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((model) => (
                    <PromptInputModelSelectItem
                      key={model.value}
                      value={model.value}
                    >
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
              <MultiSelect
                options={sources}
                onValueChange={setSelectedSources}
                defaultValue={selectedSources}
                minWidth='160px'
                maxWidth='160px'
                hideSelectAll={true}
                iconOnly={true}
                defaultIcon={DatabaseIcon}
                emptyTooltip='Select sources'
              />
              <MultiSelect
                options={channels}
                onValueChange={setSelectedChannels}
                defaultValue={selectedChannels}
                minWidth='160px'
                maxWidth='160px'
                hideSelectAll={true}
                iconOnly={true}
                defaultIcon={MegaphoneIcon}
                emptyTooltip='Select channels'
              />
            </PromptInputTools>
            <PromptInputSubmit disabled={!input && !status} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatBotDemo;
