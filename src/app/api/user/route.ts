import { withSession } from 'supertokens-node/nextjs';
import { NextResponse, NextRequest } from 'next/server';
import { ensureSuperTokensInit } from '../../config/backendConfig';

ensureSuperTokensInit();

/*
/ MIDDLEWARE
/ an API /api/user GET which returns the current session information.
*/
export function GET(request: NextRequest) {
  // withSession will pass the session object in the callback which we then use to read user information. If a session does not exist undefined will be passed instead
  // The withSession guard will return:
  // Status 401 if the session does not exist or has expired
  // Status 403 if the session claims fail their validation. For example if email verification is required but the user's email is not verified.
  return withSession(request, async (err, session) => {
    if (err) {
      return NextResponse.json(err, { status: 500 });
    }
    if (!session) {
      return new NextResponse('Authentication required', { status: 401 });
    }

    return NextResponse.json({
      note: 'Fetch any data from your application for authenticated user after using verifySession middleware',
      userId: session.getUserId(),
      sessionHandle: session.getHandle(),
      accessTokenPayload: session.getAccessTokenPayload(),
    });
  });
}
