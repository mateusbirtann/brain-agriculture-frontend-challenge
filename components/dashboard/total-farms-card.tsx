import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TotalFarmsCardProps = {
  totalFarms: number;
  totalHectares: number;
};

export function TotalFarmsCard({ totalFarms, totalHectares }: TotalFarmsCardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Total de Fazendas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalFarms}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Área Total (Hectares)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalHectares}</p>
        </CardContent>
      </Card>
    </div>
  );
}