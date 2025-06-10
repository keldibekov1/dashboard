import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import type { CategoryList } from "../../types";

const useCategory = () => {
  return useQuery({
    queryKey: ["categories"], 
    queryFn: () => request.get<CategoryList>("/category").then(res => res.data),
  });
};

export default useCategory;
