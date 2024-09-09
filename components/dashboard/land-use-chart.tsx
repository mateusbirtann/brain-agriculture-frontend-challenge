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
import { LandUse } from "@/types"

interface LandUseData {
  _sum: {
    arableArea: number | null;
    vegetationArea: number | null;
  };
}

interface LandUseChartProps {
  data: LandUseData | LandUse;
}

const COLORS = ['#00C49F', '#0088FE'];

export function LandUseChart({ data }: LandUseChartProps) {
  const arableArea = Math.round('_sum' in data ? data._sum.arableArea || 0 : data.arableArea);
  const vegetationArea = Math.round('_sum' in data ? data._sum.vegetationArea || 0 : data.vegetationArea);
  const totalArea = arableArea + vegetationArea;

  const chartData = [
    { name: 'Área Agricultável', value: arableArea, fill: COLORS[0] },
    { name: 'Vegetação', value: vegetationArea, fill: COLORS[1] },
  ];

  const chartConfig: ChartConfig = {
    'Área Agricultável': {
      label: 'Área Agricultável',
      color: COLORS[0],
    },
    'Vegetação': {
      label: 'Vegetação',
      color: COLORS[1],
    },
    value: {
      label: 'Hectares',
    },
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentValue = ((value / totalArea) * 100).toFixed(1);

    return (
      <>
        <text 
          x={x} 
          y={y - 10} 
          fill="white" 
          textAnchor={'middle'} 
          dominantBaseline="central"
          fontSize="12"
          className='font-bold'
        >
          {`${value}` + ' ha'}
        </text>
        <text 
          x={x} 
          y={y + 10} 
          fill="white" 
          textAnchor={'middle'} 
          dominantBaseline="central"
          fontSize="12"
          className='font-bold'
        >
          {`(${percentValue}%)`}
        </text>
      </>
    );
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Uso do Solo</CardTitle>
        <CardDescription>Distribuição entre área agricultável e vegetação</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend 
              content={<ChartLegendContent nameKey="name" />} 
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/2 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}