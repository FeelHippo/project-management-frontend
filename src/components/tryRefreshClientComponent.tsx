'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Session from 'supertokens-web-js/recipe/session';
import { ClientRedirect } from '@/components/clientRedirect';

export const TryRefreshComponent = () => {
  const router = useRouter();

  useEffect(() => {
    void Session.attemptRefreshingSession()
      .then((hasSession) => {
        if (hasSession) {
          return <ClientRedirect path="/dashboard" />;
        } else {
          /**
           * This means that the session is expired and cannot be refreshed.
           * In this example we redirect the user back to the login page.
           */
          return <ClientRedirect path="/login" />;
        }
      })
      .catch(() => {
        return <ClientRedirect path="/registration" />;
      });
  }, [router]);

  return <div></div>;
};
