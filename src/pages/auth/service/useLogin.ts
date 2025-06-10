import { request } from "../../../config/request";
import { useMutation } from "@tanstack/react-query";


interface LoginData {
    email: string,
    password: string
}
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) =>
      request.post("/auth/login", data).then((res) => res.data),
  });
};
