import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import {getProjects} from "@/hooks/projects";
import SideBarList from '@/components/projects/sidebarList';

export default async function Dashboard() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
      queryKey: ['projects'],
      queryFn: getProjects,
  });

  return (
      <HydrationBoundary
        state={dehydrate(queryClient)}
      >
          <SideBarList />
      </HydrationBoundary>
  );
}
