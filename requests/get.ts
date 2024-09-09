import { GetRequestResponse } from "@/types";

export const getRequest = async <T>(endpoint: string, options?: RequestInit): Promise<GetRequestResponse<T>> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const url = new URL(endpoint, baseUrl);

  const initialOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const response = await fetch(url.toString(), initialOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return { ok: true, data };
};