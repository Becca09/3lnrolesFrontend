'use client'

import useSWR, { mutate as globalMutate } from 'swr';
import { fetchAPI } from '@/lib/api';
import { RolesResponse, RoleResponse } from '@/types/roles';

const swrFetcher = <T,>(endpoint: string) => fetchAPI<T>(endpoint);


export function useRoles() {
  const { data, error, isValidating } = useSWR<RolesResponse>('/api/roles', swrFetcher, {
    revalidateOnFocus: false,
  });

  return {
    roles: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading: !error && !data,
    isValidating,
    isError: !!error,
    error,
    refresh: () => globalMutate('/api/roles'),
  };
}


export function useRoleById(id?: string) {
  const key = id ? `/api/roles/${id}` : null;
  const { data, error, isValidating } = useSWR<RoleResponse>(key, swrFetcher, {
    revalidateOnFocus: false,
  });

  return {
    role: data?.data ?? null,
    isLoading: !!(key && !data && !error),
    isValidating,
    isError: !!error,
    error,
    refresh: () => key && globalMutate(key),
  };
}


export function useRolesByStatus(status?: string) {
  const key = status ? `/api/roles/status/${encodeURIComponent(status)}` : null;
  const { data, error, isValidating } = useSWR<RolesResponse>(key, swrFetcher, {
    revalidateOnFocus: false,
  });

  return {
    roles: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading: !!(key && !data && !error),
    isValidating,
    isError: !!error,
    error,
    refresh: () => key && globalMutate(key),
  };
}


export function useRolesByType(type?: string) {
  const key = type ? `/api/roles/type/${encodeURIComponent(type)}` : null;
  const { data, error, isValidating } = useSWR<RolesResponse>(key, swrFetcher, {
    revalidateOnFocus: false,
  });

  return {
    roles: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading: !!(key && !data && !error),
    isValidating,
    isError: !!error,
    error,
    refresh: () => key && globalMutate(key),
  };
}


export type { TeamMember } from '@/types/roles';

