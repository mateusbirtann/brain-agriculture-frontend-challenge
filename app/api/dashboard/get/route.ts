import { NextRequest, NextResponse } from 'next/server';
import { dashboardService } from '@/services/dashboard-service';

export async function GET(request: NextRequest) {
  try {
    const dashboardData = await dashboardService.getDashboardData();
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}