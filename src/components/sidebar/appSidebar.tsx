'use client';

import { ChevronUp, Settings, User2, LogOut } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Session from 'supertokens-web-js/recipe/session';
import SideBarList from '@/components/projects/sidebarList';
import { UserContext } from '@/app/providers/context';
import { useContext } from 'react';

export function AppSidebar() {
  const userContext = useContext(UserContext);
  async function logout() {
    await Session.signOut();
    userContext?.setUser('');
    window.location.href = '/login'; // or to wherever your logic page is
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="h-[100%]">
          <SidebarGroupLabel>Project Management</SidebarGroupLabel>
          <SidebarGroupContent className="h-[100%]">
            <SideBarList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />{' '}
                  {!!userContext?.user ? userContext.user : 'User Profile'}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[var(--radix-popper-anchor-width)]"
              >
                <DropdownMenuItem onSelect={async () => await logout()}>
                  <Settings />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={async () => await logout()}>
                  <LogOut />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
