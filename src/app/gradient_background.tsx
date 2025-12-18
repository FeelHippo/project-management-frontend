import { JSX } from 'react';

export default function GradientBackground(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gradients: any[];
  title?: string;
  subtitle?: string;
}): JSX.Element {
  return (
    <div className="hidden md:flex">
      {props.gradients.map((gradient, i) => (
        <div
          key={i.toString()}
          className="inline min-w-1/28 w-1/28 min-h-full h-full bg-linear-to-r from-blue-600 to-blue-500 z-0"
          style={{ minHeight: '100vh' }}
        >
          {!!gradient && (
            <div
              className={`block min-w-1/28 w-1/28 bg-linear-to-b from-transparent ${gradient?.via} to-transparent z-1`}
              style={{
                height: '50vh',
                minWidth: '100%',
                marginTop: gradient?.marginTop,
              }}
            ></div>
          )}
        </div>
      ))}
      {props.title && (
        <div
          className="font-sans font-extrabold text-7xl"
          style={{ position: 'absolute', top: '66vh', left: '5vw' }}
        >
          {props.title}
        </div>
      )}
      {props.subtitle && (
        <div
          className="font-sans text-5xl"
          style={{ position: 'absolute', top: '77vh', left: '5vw' }}
        >
          {props.subtitle}
        </div>
      )}
    </div>
  );
}
