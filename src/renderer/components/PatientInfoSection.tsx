import React from 'react';

interface PatientInfoSectionProps {
  title: string;
  children: React.ReactNode;
  showDivider: boolean;
  // eslint-disable-next-line react/require-default-props
  indent?: boolean;
}

export default function PatientInfoSection({
  title,
  children,
  showDivider,
  indent = true,
}: PatientInfoSectionProps) {
  return (
    <>
      {showDivider && <div className="my-2 h-[1px] bg-gray-200" />}
      <div className="text-xs font-semibold text-gray-900 mb-2">{title}</div>
      <div className={indent ? 'ml-4' : ''}>{children}</div>
    </>
  );
}
