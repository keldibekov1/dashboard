import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

type Color = {
  id: string;
  name: string;
};

interface ColorListResponse {
  data: Color[];
  total: number;
  page: number;
  totalPages: number;
}

const useColor = () => {
  return useQuery({
    queryKey: ["colors"],
    queryFn: () =>
      request
        .get<ColorListResponse>("/color")
        .then((res) => res.data.data), 
  });
};

export default useColor;
