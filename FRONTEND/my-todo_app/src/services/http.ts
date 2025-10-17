import { API_BASE_URL } from "../lib/config";

export class HttpError extends Error {
  status: number;
  info?: unknown;
  constructor(message: string, status: number, info?: unknown) {
    super(message);
    this.status = status;
    this.info = info;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`.replace(/\/$/, ""), {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let info: unknown = undefined;
    try {
      info = await res.json();
    } catch {
      // ignore parse errors
    }
    const message =
      typeof info === "object" && info !== null && "detail" in info
        ? String((info as Record<string, unknown>)["detail"])
        : res.statusText;
    throw new HttpError(message, res.status, info);
  }

  // 204 no content
  if (res.status === 204) return undefined as unknown as T;

  return (await res.json()) as T;
}

export const http = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: "POST", body: JSON.stringify(body ?? {}) }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, { method: "PATCH", body: JSON.stringify(body ?? {}) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
