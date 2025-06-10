import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useLogin } from "./service/useLogin";
import { saveState } from "../../config/storage";
import { useNavigate } from "react-router-dom";
type FieldType = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const { isPending, mutate } = useLogin();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    mutate(values, {
      onSuccess: (res: { token: string }) => {
        saveState("token", res.token);
        navigate("/app",{
            replace:true
        })
        console.log(res);
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <Form
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        className=" p-8 rounded-lg w-full max-w-md"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isPending}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
