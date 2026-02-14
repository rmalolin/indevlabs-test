import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: '2xl' | '4xl';
}

const widthClasses = {
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
};

export function PageContainer({ children, maxWidth = '4xl' }: PageContainerProps) {
  return <div className={`${widthClasses[maxWidth]} mx-auto p-6`}>{children}</div>;
}
