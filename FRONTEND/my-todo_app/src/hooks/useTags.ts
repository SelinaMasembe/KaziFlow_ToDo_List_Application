import { useQuery } from "@tanstack/react-query";
import { tagsService, type Tag } from "../services/tags";

export function useTags() {
  return useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: () => tagsService.list(),
  });
}
