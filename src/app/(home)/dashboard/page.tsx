'use client';

import SideBarList from '@/components/projects/sidebarList';
import Session from 'supertokens-web-js/recipe/session';
import { useEffect } from 'react';

export default function Dashboard() {
  // TODO(Filippo): avoid flash navigation to dashboard if user has no session
  // protect this route frm direct navigation
  useEffect(() => {
    (async () => {
      if (!(await Session.doesSessionExist())) {
        window.location.href = '/login';
      }
    })();
  }, []);
  return <div>Project Details Here</div>;
}
