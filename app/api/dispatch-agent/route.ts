import { RoomServiceClient, CreateRoomOptions } from 'livekit-server-sdk';
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
    const roomService = new RoomServiceClient(livekitUrl, apiKey, apiSecret);
    
    // Dispatch agent to room
    await roomService.createRoom({
      name: roomName,
      emptyTimeout: 300, // 5 minutes
      maxParticipants: 10,
    } as CreateRoomOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to dispatch agent:', error);
    return NextResponse.json(
      { error: 'Failed to dispatch agent' },
      { status: 500 }
    );
  }
}
