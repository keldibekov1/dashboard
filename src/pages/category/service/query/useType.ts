import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import type { TypeItem } from "../../types";

const useType = () => {
  return useQuery({
    queryKey: ["type"],
    queryFn: () =>
      request.get<TypeItem[]>("/type").then((res) => res.data),
  });
};

export default useType;
