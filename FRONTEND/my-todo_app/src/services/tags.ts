import { http } from "./http";

export interface Tag { id: number; name: string }

export const tagsService = {
  list: () => http.get<Tag[]>("/tags"),
  create: (name: string) => http.post<Tag>("/tags", { name }),
};
