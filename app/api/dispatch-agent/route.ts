import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { roomName } = await request.json();

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !livekitUrl) {
    return NextResponse.json(
      { error: 'LiveKit credentials not configured' },
      { status: 500 }
    );
  }

  try {
    // Call LiveKit Agent Dispatch API
    const dispatchUrl = livekitUrl.replace('wss://', 'https://') + '/twirp/livekit.AgentDispatchService/CreateDispatch';
    
    const authHeader = 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    
    const response = await fetch(dispatchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({
        room: roomName,
        agent_name: 'vana_agent',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Agent dispatch failed:', error);
      return NextResponse.json(
        { error: 'Failed to dispatch agent', details: error },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to dispatch agent:', error);
    return NextResponse.json(
      { error: 'Failed to dispatch agent' },
      { status: 500 }
    );
  }
}
