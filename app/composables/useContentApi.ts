function normalizeBase(value: unknown) {
  return String(value || '').replace(/\/+$/, '')
}

function normalizePath(path: string) {
  return path.startsWith('/') ? path : `/${path}`
}

export function useContentApi() {
  const config = useRuntimeConfig()
  const baseUrl = normalizeBase(config.public.contentApiBase)

  function request<T>(path: string) {
    const url = `${baseUrl}${normalizePath(path)}`
    return useFetch<T>(url, { key: `content:${path}` })
  }

  async function fetchPublic<T>(path: string) {
    return await $fetch<T>(`${baseUrl}${normalizePath(path)}`)
  }

  return { baseUrl, request, fetchPublic }
}
