import React from 'react';
import GradientBackground from '@/app/gradient_background';
import { gradients } from '@/lib/constants/lists';

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <GradientBackground
        gradients={gradients}
        title="Welcome to"
        subtitle="Project Management"
      />
      {children}
    </section>
  );
}
