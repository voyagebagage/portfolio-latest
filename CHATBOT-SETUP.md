# 🤖 Chatbot Setup Guide

This portfolio includes an AI chatbot that can answer questions about Olivier F.'s professional background.

## 🚀 Quick Setup

### 1. Get a Free Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables

Create a `.env.local` file in the project root with:

```env
# Required: Groq API key (free tier: 14,400 requests/day)
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here

# Optional: LlamaAPI key as fallback
NEXT_PUBLIC_LLAMA_API_KEY=your_llama_api_key_here
```

### 3. Start the Application

```bash
npm run dev
```

## 🔧 How It Works

- **Primary**: Uses Groq API (fast, reliable, generous free tier)
- **Fallback**: Falls back to LlamaAPI if Groq fails
- **Error Handling**: Proper messages for rate limits and errors
- **Content**: Responds as Olivier F. with portfolio information

## 📊 Free Tier Limits

- **Groq**: 14,400 requests per day (very generous)
- **Model**: llama3-8b-8192 (fast and capable)
- **Rate Limit Message**: Users get friendly message when limits are reached

## 🛠️ Troubleshooting

### Chatbot not responding?

1. Check console logs for API key status
2. Verify your Groq API key is valid
3. Restart the development server

### Getting rate limit errors?

- Wait a few minutes (rate limits reset)
- Consider upgrading to Groq's paid tier for higher limits

### Want to use a different AI service?

- Update `lib/ai-service.ts` with your preferred API
- OpenAI, Anthropic, and others are easy to integrate
