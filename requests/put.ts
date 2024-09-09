import { PutRequestResponse } from "@/types";

export const putRequest = async <T = Record<string, any>, K = Record<string, any>>(
  endpoint: string,
  body: T,
  options?: RequestInit
): Promise<PutRequestResponse<K>> => {

  const initialOptions = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };
  const response = await fetch(`${endpoint}`, initialOptions);

  const data = await response.json();

  return { ok: response.ok, status: response.status, data };
};