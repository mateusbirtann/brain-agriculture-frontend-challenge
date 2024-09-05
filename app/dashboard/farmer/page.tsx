import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { FarmerTable } from '@/components/tables/farmer-table';
import { columns } from '@/components/tables/farmer-table/columns';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { data } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Produtores Rurais', link: '/dashboard/farmer' }
  ];

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title="Lista de produtores Rurais"
            description="Gerencie os produtores Rurais da plataforma."
          />
          <Link
            href={'/dashboard/farmer/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Adicionar novo produtor cultural
          </Link>
        </div>
        <Separator />

        <div className="container mr-auto py-10">
          <FarmerTable
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </PageContainer>
  );
}
