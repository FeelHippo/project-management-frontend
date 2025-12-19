import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const ClientRedirect = ({ path }: { path: string }) => {
  const router = useRouter();
  useEffect(() => {
    router.replace(path);
  }, [path, router]);

  return null;
};
