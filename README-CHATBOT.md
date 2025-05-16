# AI Chatbot Setup Guide

This portfolio includes an AI assistant chatbot that can answer questions about you. Here's how to set it up:

## Troubleshooting 404 Errors with LlamaAPI

If you're seeing a 404 error with LlamaAPI, check the following:

1. **API URL**: Make sure you're using the correct API endpoint URL. The code now uses:
   ```
   https://api.llama-api.com/chat/completions
   ```

2. **API Key**: Ensure your API key is valid and properly set in your `.env.local` file:
   ```
   NEXT_PUBLIC_LLAMA_API_KEY=your_llama_api_key_here
   ```

3. **Model Name**: The code is currently using `llama-3-8b-chat`. If LlamaAPI requires a different model name, you can update it in `lib/fireworks.ts`.

4. **Subscription Plan**: Make sure your LlamaAPI account has an active subscription that allows API access.

## Fallback Mechanism

The chatbot now includes a built-in fallback mechanism that will work even if no API keys are provided or if the API calls fail. It provides smart responses based on the user's questions using the information from your system prompt in `app/api/chat/route.ts`.

## Customizing Your Information

To personalize the chatbot with your information:

1. Edit the system prompt in `/app/api/chat/route.ts`
2. Update the responses in the `createDemoResponse` function in `/lib/fireworks.ts` to match your personal information

## Alternative AI Providers

If you want to try a different AI provider, you can:

1. Add your API key to `.env.local`:
   ```
   # OpenAI API (most reliable)
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   ```

2. Uncomment and modify the OpenAI implementation in `lib/fireworks.ts`

## Testing Your Setup

After making changes:

1. Restart your Next.js server
2. Try asking different questions in the chat interface
3. Check the console logs for API response status and error messages

The demo response will always work as a backup, ensuring your chatbot functions even without external APIs.