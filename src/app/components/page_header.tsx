import { RefObject } from 'react';

export interface PageHeaderInterface {
  text: string;
  width: number | undefined;
  parentRef: RefObject<HTMLHeadingElement | null>;
}
export default function PageHeader({
  text,
  width,
  parentRef,
}: PageHeaderInterface) {
  return (
    <div>
      <div ref={parentRef} className="font-sans font-bold text-black text-6xl">
        {text}
      </div>
      <div
        className="bg-linear-to-r/increasing from-indigo-500 to-teal-400 w-60 h-1 mt-1"
        style={{ width: width }}
      ></div>
    </div>
  );
}
