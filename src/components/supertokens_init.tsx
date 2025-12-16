'use client';

import React from 'react';
import SuperTokensWebJs from 'supertokens-web-js';
import { frontendConfig } from '../app/config/frontend';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensWebJs.init(frontendConfig());
}

/*
/ This component will initialise SuperTokens
*/
// eslint-disable-next-line  @typescript-eslint/no-empty-object-type
export const SupertokensInit: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return <>{children}</>;
};
