import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface CreateCategoryDto {
  name: string;
  typeId: string;
}

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCategory: CreateCategoryDto) =>
      request.post("/category", newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export default useCreateCategory;
