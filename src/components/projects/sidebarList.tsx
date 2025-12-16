'use client';

import {useQuery} from "@tanstack/react-query";
import {getProjects} from "@/hooks/projects";

export default function SidebarList() {
    const { data } = useQuery({
        queryKey: ['projects'],
        queryFn: () => getProjects(),
    });

    return (<div>{data ? data[0].name : 'NO DATA'}</div>);
}
