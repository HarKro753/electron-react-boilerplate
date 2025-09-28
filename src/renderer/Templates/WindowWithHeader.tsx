import { ReactNode } from 'react';

interface WindowWithHeaderProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

function WindowWithHeader({
  children,
  className = '',
  contentClassName = 'flex-[1] h-full bg-white rounded-sm border p-2 flex flex-col ',
}: WindowWithHeaderProps) {
  return (
    <div className={`flex flex-col mt-0 ${className}`}>
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

export default WindowWithHeader;
