import { Breadcrumbs } from '@/components/breadcrumbs';
import { FarmersForm } from '@/components/forms/farmers/farmers-form';
import PageContainer from '@/components/layout/page-container';
import React from 'react';

type PropParamsPage = {
  params: {
    farmerId: string;
  };
};

export default function Page({ params }: PropParamsPage) {
  const { farmerId } = params;
  const titleForm = farmerId !== "new" ? 'Editar' : 'Adicionar';

  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Produtores Rurais', link: '/dashboard/farmers' },
    { title: `${titleForm} produtor rural`, link: '/dashboard/farmers/new' }
  ];

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <FarmersForm />
      </div>
    </PageContainer>
  );
}
