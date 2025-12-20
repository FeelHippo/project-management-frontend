import { cookies } from 'next/headers';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import QueryProvider from '@/app/providers/query';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <QueryProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <main className="w-full h-full">{children}</main>
      </SidebarProvider>
    </QueryProvider>
  );
}
