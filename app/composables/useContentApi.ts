function normalizeBase(value: unknown) {
  return String(value || '').replace(/\/+$/, '')
}

function normalizePath(path: string) {
  return path.startsWith('/') ? path : `/${path}`
}

export function useContentApi() {
  const config = useRuntimeConfig()
  const baseUrl = normalizeBase(config.public.contentApiBase)

  function absoluteUrl(path: string) {
    return `${baseUrl}${normalizePath(path)}`
  }

  function request<T>(path: string) {
    return useFetch<T>(absoluteUrl(path), { key: `content:${path}` })
  }

  async function fetchPublic<T>(path: string) {
    return await $fetch<T>(absoluteUrl(path))
  }

  function mediaUrl(mediaReferenceId?: string | null) {
    const id = String(mediaReferenceId || '').trim()
    return id ? absoluteUrl(`/api/public/media/${encodeURIComponent(id)}/content`) : undefined
  }

  return { baseUrl, absoluteUrl, mediaUrl, request, fetchPublic }
}
