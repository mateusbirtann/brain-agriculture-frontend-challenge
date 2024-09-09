import { PostRequestResponse } from "@/types";

export const postRequest = async <T = Record<string, any>, K = Record<string, any>>(
  endpoint: string,
  body: T,
  options?: RequestInit
): Promise<PostRequestResponse<K>> => {

  const initialOptions = {
    method: 'POST',
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