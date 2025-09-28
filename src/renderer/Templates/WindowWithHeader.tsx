import { ReactNode } from 'react';

interface WindowWithHeaderProps {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

function WindowWithHeader({ 
  title, 
  children, 
  className = "", 
  contentClassName = "flex-[1] h-full bg-white rounded-sm border p-2 flex flex-col mt-2" 
}: WindowWithHeaderProps) {
  return (
    <div className={`flex flex-col mt-4 ${className}`}>
      <h3 className="ml-2 text-sm text-black font-semibold flex-shrink-0">
        {title}
      </h3>
      <div className={contentClassName}>
        {children}
      </div>
    </div>
  );
}

export default WindowWithHeader;