import { getDashboardData } from '@/requests/dashboard';
import { FarmByCropChart } from '@/components/dashboard/farm-by-crop-chart';
import { FarmByStateChart } from '@/components/dashboard/farm-by-state-chart';
import { LandUseChart } from '@/components/dashboard/land-use-chart';
import { TotalFarmsCard } from '@/components/dashboard/total-farms-card';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';

export default async function Page() {
  const response = await getDashboardData();

  if (!response.ok) {
    return (
      <PageContainer>
        <Heading
          title="Dashboard"
          description="An error occurred while fetching dashboard data."
        />
      </PageContainer>
    );
  }

  const {
    totalFarms,
    totalHectares,
    farmsByState,
    farmsByCrop,
    landUse
  } = response.data;

  return (
    <PageContainer scrollable={true}>
      <Heading
        title="Dashboard"
        description="Acompanhe os números da plataforma."
      />

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <TotalFarmsCard
          totalFarms={totalFarms}
          totalHectares={totalHectares}
        />
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-1 xl:col-span-1">
          <FarmByStateChart data={farmsByState} />
        </div>
        <div className="lg:col-span-1 xl:col-span-1">
          <FarmByCropChart data={farmsByCrop} />
        </div>
        <div className="lg:col-span-1 xl:col-span-1">
          <LandUseChart data={landUse} />
        </div>
      </div>
    </PageContainer>
  );
}