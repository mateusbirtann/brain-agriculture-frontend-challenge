import PageContainer from '@/components/layout/page-container';
import { FarmerTable } from '@/components/tables/farmer-table';
import { columns } from '@/components/tables/farmer-table/columns';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/lib/utils';
import { farmerService } from '@/services/farmer-service';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function Page() {
  const farmers = await farmerService.getAllFarmers();

  return (
    <PageContainer>
      <div className="space-y-4 max-w-screen-2xl">
        <div className="flex lg:flex-row gap-4 flex-col items-start justify-between">
          <Heading
            title="Produtores rurais"
            description="Gerencie os produtores rurais da plataforma."
          />
          <Link
            href={'/dashboard/farmers/new'}
            className={`${cn(buttonVariants({ variant: 'default' }))} sm:ml-auto`}
          >
            <Plus className="mr-2 h-4 w-4" /> Adicionar novo produtor rural
          </Link>
        </div>

        <FarmerTable columns={columns} data={farmers} />
      </div>
    </PageContainer>
  );
}