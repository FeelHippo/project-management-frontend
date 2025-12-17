'use client';
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface UserContextInterface {
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<UserContextInterface | null>(null);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<string>('');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
