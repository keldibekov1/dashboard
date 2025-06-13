import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface UpdateProductDto {
  id: string;
  name: string;
  price: number;
  img: string;
  description: string;
  count: number;
  skidka: number;
  categoryId: string;
  colorIds: string[];
}

const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, colorIds, ...rest }: UpdateProductDto) =>
      request({
        url: `/products/${id}`,
        method: "PATCH",
        data: {
          ...rest,
          colorIds: colorIds.filter((id) => !!id), 
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};


export default useUpdateProduct;
