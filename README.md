# Portfolio Website

A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive design
- Light/dark mode toggle
- Language selection with 9 languages
- Interactive AI assistant chatbot
- Sections for experience, projects, and education

## AI Chatbot Configuration

The portfolio includes an AI assistant chatbot that can answer questions about the portfolio owner. To configure it:

1. **Customize personal information**:
   - Edit the system prompt in `/app/api/chat/route.ts` to include your own information
   - The system prompt contains sections for experience, skills, projects, education, and response guidelines

2. **Set up API keys**:
   - Create a `.env.local` file in the root directory
   - Add one of these API keys:
     ```
     NEXT_PUBLIC_LLAMA_API_KEY=your_llama_api_key
     ```
     OR
     ```
     NEXT_PUBLIC_FIREWORKS_API_KEY=your_fireworks_api_key
     ```
   - You can obtain free API keys from:
     - [LlamaAPI](https://llama-api.com) (recommended, has free tier)
     - [Fireworks AI](https://fireworks.ai) (alternative)

Without an API key, the chatbot will run in demo mode with limited functionality.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customizing Content

- Update personal information in `translations.json` (supports multiple languages)
- Modify experience, projects, and education data in `app/Portfolio.tsx`
- Change the color theme in `styles/globals.css`

## Languages Supported

- English (en)
- French (fr)
- Russian (ru)
- Norwegian (no)
- Swiss German (gsw)
- Japanese (ja)
- Chinese (zh)
- Spanish (es)
- Portuguese (pt)