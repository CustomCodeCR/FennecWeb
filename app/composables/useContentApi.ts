import type { UseFetchOptions } from 'nuxt/app'

function normalizeBase(value: unknown) {
  return String(value || '').replace(/\/+$/, '')
}

function normalizePath(path: string) {
  return path.startsWith('/') ? path : `/${path}`
}

export function useContentApi() {
  const config = useRuntimeConfig()
  const baseUrl = normalizeBase(config.public.contentApiBase)

  function request<T>(path: string, options: UseFetchOptions<T> = {}) {
    return useFetch<T>(`${baseUrl}${normalizePath(path)}`, {
      ...options,
      key: options.key ?? `content:${path}`,
    })
  }

  async function fetchPublic<T>(path: string, options: Parameters<typeof $fetch<T>>[1] = {}) {
    return await $fetch<T>(`${baseUrl}${normalizePath(path)}`, options)
  }

  return { baseUrl, request, fetchPublic }
}
