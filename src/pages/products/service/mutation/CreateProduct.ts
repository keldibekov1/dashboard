import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface CreateProductDto {
  name: string;
  price: number;
  img: string;
  description: string;
  count: number;
  skidka: number;
  categoryId: string;
  colorIds: string[];
}

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: CreateProductDto) =>
      request.post("/products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export default useCreateProduct;
