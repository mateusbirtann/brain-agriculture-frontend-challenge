import { DashboardData, GetRequestResponse } from "@/types";
import { getRequest } from "@/requests/get";

export const getDashboardData = async (): Promise<GetRequestResponse<DashboardData>> => {
  const response = await getRequest<DashboardData>('/api/dashboard/get');

  if (!response.ok) {
    throw new Error('Failed to get dashboard data');
  }

  return {
    ok: true,
    data: response.data as DashboardData
  };
};