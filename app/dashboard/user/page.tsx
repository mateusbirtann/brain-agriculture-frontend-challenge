import PageContainer from '@/components/layout/page-container';

export default function Page() {
  return (
    <PageContainer scrollable={true}>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">User List</h2>
      </div>
    </PageContainer>
  );
}
