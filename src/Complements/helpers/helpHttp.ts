type HttpOptions = {
  body?: unknown;
  headers?: Record<string, string>;
};

const customFetch = async (
  endpoint: string,
  options: RequestInit
): Promise<any> => {
  const response = await fetch(endpoint, options);

  if (!response.ok) {
    throw new Error(`Error en la petición: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
};

export const helpHttp = () => {
  const get = (endpoint: string, options: HttpOptions = {}) => {
    return customFetch(endpoint, {
      method: "GET",
      headers: options.headers,
    });
  };

  const post = (endpoint: string, options: HttpOptions = {}) => {
    return customFetch(endpoint, {
      method: "POST",
      headers: options.headers,
      body: JSON.stringify(options.body),
    });
  };

  const put = (endpoint: string, options: HttpOptions = {}) => {
    return customFetch(endpoint, {
      method: "PUT",
      headers: options.headers,
      body: JSON.stringify(options.body),
    });
  };

  const del = (endpoint: string, options: HttpOptions = {}) => {
    return customFetch(endpoint, {
      method: "DELETE",
      headers: options.headers,
    });
  };

  return { get, post, put, delete: del };
};