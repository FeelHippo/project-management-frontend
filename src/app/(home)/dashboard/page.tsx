import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { TryRefreshComponent } from '@/components/try_refresh_client_component';
import { connectionURI } from '@/app/config/backend';
import jwksClient from 'jwks-rsa';
import JsonWebToken from 'jsonwebtoken';
import type { JwtHeader, JwtPayload, SigningKeyCallback } from 'jsonwebtoken';

// Configure the client
// Provide a JWKS endpoint which exposes your signing keys => SuperTokens provider
// https://www.npmjs.com/package/jwks-rsa
// https://auth0.com/docs
const client = jwksClient({
  jwksUri: `${connectionURI}/.well-known/jwks.json`,
});

async function getAccessToken() {
  const cookiesStore = await cookies();
  return cookiesStore.get('sAccessToken')?.value;
}

function getPublicKey(header: JwtHeader, callback: SigningKeyCallback) {
  // Retrieve a key
  // Then use getSigningKey to retrieve a signing key that matches a specific kid
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
    } else {
      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    }
  });
}

async function verifyToken(token: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    JsonWebToken.verify(token, getPublicKey, {}, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
}

/**
 * A helper function to retrieve session details on the server side.
 *
 * NOTE: This function does not use the getSession / verifySession function from the supertokens-node SDK
 * because those functions may update the access token. These updated tokens would not be
 * propagated to the client side properly, as request interceptors do not run on the server side.
 * So instead, we use regular JWT verification library
 */
async function getSSRSessionHelper(): Promise<{
  accessTokenPayload: JwtPayload | undefined;
  hasToken: boolean;
  error: Error | undefined | unknown;
}> {
  const accessToken = await getAccessToken();
  const hasToken = !!accessToken;
  try {
    if (accessToken) {
      const decoded = await verifyToken(accessToken);
      return { accessTokenPayload: decoded, hasToken, error: undefined };
    }
    return { accessTokenPayload: undefined, hasToken, error: undefined };
  } catch (error) {
    return { accessTokenPayload: undefined, hasToken, error: error };
  }
}

export default async function Page() {
  const { accessTokenPayload, hasToken, error } = await getSSRSessionHelper();

  if (error) {
    return (
      <div>
        Something went wrong while trying to get the session. Error -{' '}
        {error instanceof Error && error.message}
      </div>
    );
  }

  // `accessTokenPayload` will be undefined if the session does not exist or has expired
  if (accessTokenPayload === undefined) {
    if (!hasToken) {
      /**
       * This means that the user is not logged in. If you want to display some other UI in this
       * case, you can do so here.
       */
      return redirect('/registration');
    }

    /**
     * This means that the session does not exist, but we have session tokens for the user. In this case
     * the `TryRefreshComponent` will try to refresh the session.
     *
     * To learn about why the 'key' attribute is required refer to: https://github.com/supertokens/supertokens-node/issues/826#issuecomment-2092144048
     */
    return <TryRefreshComponent key={Date.now()} />;
  }

  return <div>Your user id is: {accessTokenPayload.sub}</div>;
}
