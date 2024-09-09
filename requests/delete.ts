import { DeleteRequestResponse } from '@/types';

export const deleteRequest = async <T = Record<string, any>>(
  endpoint: string,
  options?: RequestInit,
): Promise<DeleteRequestResponse<T>> => {
  const initialOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };

  const response = await fetch(`${endpoint}`, initialOptions);

  const data = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};
