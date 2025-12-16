'use client';

import LoginForm from '@/components/forms/login';
import PageHeader from '@/components/pageHeader';
import { useEffect, useRef, useState } from 'react';
export default function Page() {
  const [width, updateWidth] = useState<number>(0);

  // https://stackoverflow.com/a/56011277/10708345
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current && updateWidth(ref.current.offsetWidth);
  }, [ref.current]);

  return (
    <div className="absolute right-0 top-0 w-full md:w-1/2 h-full flex flex-col items-start bg-white rounded-s-2xl px-16 py-32">
      <PageHeader text={'Access'} width={width} parentRef={ref} />
      <LoginForm text={'Log In'} width={width} />
    </div>
  );
}
