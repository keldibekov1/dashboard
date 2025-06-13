import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

const useProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      request.get<any[]>("/products").then((res) => res.data),
  });
};

export default useProduct;
