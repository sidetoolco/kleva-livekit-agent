'use client';

import { useState } from 'react';
import { LiveKitRoom, RoomAudioRenderer, useVoiceAssistant, BarVisualizer } from '@livekit/components-react';
import '@livekit/components-styles';

function VoiceAssistantUI() {
  const { state, audioTrack } = useVoiceAssistant();
  
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Ana - Collections Agent</h2>
        <p className="text-gray-600 mb-4">
          Status: <span className="font-semibold text-blue-600">{state}</span>
        </p>
      </div>
      
      {audioTrack && (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <BarVisualizer state={state} barCount={5} trackRef={audioTrack} />
        </div>
      )}
      
      <div className="text-sm text-gray-500 max-w-md text-center">
        <p>Speak in Spanish to test the collections agent</p>
        <p className="mt-2">Agent will greet you and guide you through the conversation</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [token, setToken] = useState('');
  const [connecting, setConnecting] = useState(false);

  const connectToRoom = async () => {
    setConnecting(true);
    try {
      const roomName = `${Date.now()}`;
      const participantName = `user-${Date.now()}`;
      
      // Get token
      const response = await fetch(`/api/token?roomName=${roomName}&participantName=${participantName}`);
      const data = await response.json();
      
      // Dispatch agent to room
      await fetch('/api/dispatch-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName }),
      });
      
      setToken(data.token);
    } catch (error) {
      console.error('Failed to get token:', error);
      setConnecting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Ana - Voice Collections Agent
        </h1>
        
        {!token ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-gray-700 mb-4">
              Test the Spanish-speaking collections agent powered by LiveKit
            </p>
            <button
              onClick={connectToRoom}
              disabled={connecting}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold text-lg"
            >
              {connecting ? 'Connecting...' : 'Start Conversation'}
            </button>
            
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md max-w-md">
              <h3 className="font-semibold mb-2">What to expect:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Ana will greet you in Spanish</li>
                <li>She follows a 6-stage collections flow</li>
                <li>Greeting → Verification → Debt Disclosure → Negotiation → Payment Promise → Closing</li>
              </ul>
            </div>
          </div>
        ) : (
          <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            connect={true}
            audio={true}
            video={false}
            onDisconnected={() => {
              setToken('');
              setConnecting(false);
            }}
            className="flex flex-col items-center justify-center"
          >
            <VoiceAssistantUI />
            <RoomAudioRenderer />
            
            <button
              onClick={() => {
                setToken('');
                setConnecting(false);
              }}
              className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              End Call
            </button>
          </LiveKitRoom>
        )}
      </div>
      
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Powered by LiveKit Agents + OpenAI + Deepgram + ElevenLabs</p>
        <p className="mt-1">Agent ID: CA_eCs8ytPPs47R</p>
      </div>
    </main>
  );
}
