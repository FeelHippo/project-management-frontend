import { NextResponse, NextRequest } from 'next/server';
import { ensureSuperTokensInit } from '@/app/config/backend';

ensureSuperTokensInit();

/*
/ This creates a GET request for the /api/userid route which returns the user id of the currently logged in user
*/
export function GET(request: NextRequest) {
  // as set in src/middleware.ts
  const userId = request.headers.get('x-user-id');

  // The middleware only adds the userId if a session exists
  if (userId === null) {
    return new NextResponse('Authentication required', { status: 401 });
  }

  return NextResponse.json({
    userId,
  });
}
