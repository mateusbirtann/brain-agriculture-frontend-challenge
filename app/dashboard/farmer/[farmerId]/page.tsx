import { Breadcrumbs } from '@/components/breadcrumbs';
import { RegisterFarmerForm } from '@/components/forms/farmers/register-farmer-form';
import PageContainer from '@/components/layout/page-container';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Produtores Rurais', link: '/dashboard/farmer' },
  { title: 'Adicionar um novo produtor rural', link: '/dashboard/farmer/new' }
];

export default function Page() {
  return (
    <PageContainer scrollable={true}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-8">
          <Breadcrumbs items={breadcrumbItems} />
          <RegisterFarmerForm />
        </div>
      </ScrollArea>
    </PageContainer>
  );
}
