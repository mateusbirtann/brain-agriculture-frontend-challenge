import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({
  children,
  scrollable = false
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <div className="space-y-6 p-4 sm:p-6 lg:p-8">{children}</div>
        </ScrollArea>
      ) : (
        <div className="space-y-6 p-4 sm:p-6 lg:p-8">{children}</div>
      )}
    </>
  );
}
