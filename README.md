# Kleva LiveKit Agent - Ana Collections Agent

A Spanish-speaking voice AI agent for collections built with LiveKit Agents framework.

## Features

- 🗣️ **Spanish Voice AI**: Native Spanish conversation using Deepgram STT
- 🤖 **Multi-Stage Prompts**: 6-stage collections conversation flow
- 🎯 **Smart Routing**: Greeting → Verification → Debt Disclosure → Negotiation → Payment Promise → Closing
- 🚀 **Production Ready**: Deployed on LiveKit Cloud with Next.js frontend

## Tech Stack

### Backend (LiveKit Agent)
- **Framework**: LiveKit Agents (Python)
- **STT**: Deepgram Nova-2 (Spanish)
- **LLM**: OpenAI GPT-4o-mini
- **TTS**: ElevenLabs Multilingual V2 (Matilda voice)
- **VAD**: Silero
- **Turn Detection**: Multilingual Model

### Frontend (This Repository)
- **Framework**: Next.js 15 + TypeScript
- **Styling**: Tailwind CSS
- **Voice Components**: LiveKit React Components
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- LiveKit Cloud account

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to test the agent.

## Usage

1. Click "Start Conversation"
2. Speak in Spanish
3. Ana will guide you through the collections conversation
4. Click "End Call" when finished

## Deployment

Deploy to Vercel with one click or manually connect your repository.

## License

MIT
