"use client"

import React from "react"
import { Pie, PieChart, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { FarmsByCrop } from "@/types"

interface CropData {
  name: string;
  _count: {
    farmers: number;
  };
}

interface FarmByCropChartProps {
  data: CropData[] | FarmsByCrop[];
}

const colors: string[] = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

const CropMapping = {
  Soja: 'Soja',
  CanaDeAcucar: 'Cana de Açúcar',
  Cafe: 'Café',
  Algodao: 'Algodão',
  Milho: 'Milho'
}

export function FarmByCropChart({ data }: FarmByCropChartProps) {
  const chartData = data.map((item, index) => ({
    crop: CropMapping[item.name as keyof typeof CropMapping] || item.name,
    farms: 'count' in item ? item.count : item._count.farmers,
    fill: colors[index % colors.length],
  }))

  const chartConfig: ChartConfig = data.reduce((acc, item, index) => {
    const mappedName = CropMapping[item.name as keyof typeof CropMapping] || item.name;
    acc[mappedName] = {
      label: mappedName,
      color: colors[index % colors.length],
    }
    return acc
  }, {
    farms: { label: "Farms" },
  } as ChartConfig)

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, farms }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="font-bold">
        {farms}
      </text>
    );
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Fazendas por Cultura Plantada</CardTitle>
        <CardDescription>Quantidade de fazendas por cultura plantada</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="farms"
              nameKey="crop"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend 
              content={<ChartLegendContent nameKey="crop" />} 
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}