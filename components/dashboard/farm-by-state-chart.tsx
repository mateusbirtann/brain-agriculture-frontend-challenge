"use client"

"use client"

import React from 'react';
import { Pie, PieChart, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { FarmsByState, FarmStateDashboardData } from '@/types';

interface FarmByStateChartProps {
  data: FarmsByState[] | FarmStateDashboardData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export function FarmByStateChart({ data }: FarmByStateChartProps) {
  const chartData = data.map((item, index) => ({ 
    state: item.state, 
    farms: 'count' in item ? item.count : item._count._all, 
    fill: COLORS[index % COLORS.length] 
  }));

  const chartConfig: ChartConfig = chartData.reduce((acc, item) => {
    acc[item.state] = {
      label: item.state,
      color: item.fill,
    };
    return acc;
  }, {} as ChartConfig);

  chartConfig.farms = {
    label: "Fazendas",
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, farms }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className='font-bold'>
        {farms}
      </text>
    );
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Fazendas por Estado</CardTitle>
        <CardDescription>Comparação de fazendas por estado</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="farms"
              nameKey="state"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend 
              content={<ChartLegendContent nameKey="state" />} 
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}