import React from 'react';

export interface ContainerProps {
  title?: string;
  children?: React.ReactNode;
}

export function Container({ title, children }: ContainerProps) {
  return (
    <div className="flex-1 mt-12 lg:mt-22 lg:mx-32">
      {title && <p className="text-white text-3xl">{title}</p>}
      <div
        className="block h-full mt-3 overflow-y-auto rounded-t-lg rounded-lg p-5"
        style={{ backgroundColor: '#bac9a9' }}
      >
        {children}
      </div>
    </div>
  );
}
