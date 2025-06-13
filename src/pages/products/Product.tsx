import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  type TableProps,
} from "antd";
import { useState } from "react";
import useProduct from "./service/query/useProduct";
import useCategory from "../category/service/query/useCategory";
import useColor from "./service/query/useColor";
import useCreateProduct from "./service/mutation/CreateProduct";
import useUpdateProduct from "./service/mutation/UpdateProduct";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteProduct } from "./service/mutation/useDeleteProduct";

interface Color {
  id: string;
  name: string;
}

interface DataSource {
  id?: string;
  name: string;
  price: number;
  description: string;
  count: number;
  skidka: number;
  userId: string;
  category: string;
  categoryId: string;
  color?: string;
  colors?: Color[];
  createdAt: string;
}

const Product = () => {
  const { data } = useProduct();
  const { data: categories } = useCategory();
  const { data: colors } = useColor();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const { mutate }= useDeleteProduct();
    const client = useQueryClient();

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const showModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
    form.resetFields();
  };

    const deleteItems = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["products"] });
      },
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingProduct(null);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingProduct) {
        updateProduct.mutate(
          { id: editingProduct.id, ...values },
          {
            onSuccess: () => {
              handleCancel();
            },
            onError: (err) => {
              console.log("Update error:", err);
            },
          }
        );
      } else {
        createProduct.mutate(values, {
          onSuccess: () => {
            handleCancel();
          },
          onError: (err) => {
            console.log("Create error:", err);
          },
        });
      }
    });
  };

  const onEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);

    form.setFieldsValue({
      name: product.name,
      price: product.price,
      description: product.description,
      count: product.count,
      skidka: product.skidka,
      categoryId: product.categoryId,
      colorIds: product.colors?.map((c: Color) => c.id),
    });
  };

  const dataSource: DataSource[] =
    data?.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      count: item.count,
      skidka: item.skidka,
      userId: item.userId,
      categoryId: item.categoryId,
      category:
        categories?.data.find((cat: any) => cat.id === item.categoryId)?.name ||
        "Unknown",
      color: item.colors?.map((c: Color) => c.name).join(", ") || "No color",
      colors: item.colors,
      createdAt: item.createdAt,
    })) || [];

  const columns: TableProps<DataSource>["columns"] = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Count", dataIndex: "count", key: "count" },
    { title: "Skidka", dataIndex: "skidka", key: "skidka" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Color", dataIndex: "color", key: "color" },
    {
      title: "Action",
      key: "action",
    render: (_, row) => {
  return (
    <Space>
      <Button type="primary" onClick={() => onEdit(row)}>
        Edit
      </Button>
      <Button danger onClick={() => deleteItems(row.id!)}>
        Delete
      </Button>
    </Space>
  );
}

    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={showModal}>
          Create
        </Button>
      </div>

      <Table<DataSource>
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
      />

      <Modal
        title={editingProduct ? "Edit Product" : "Create Product"}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText="Save"
        width={500}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Enter product name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Enter price" }]}
          >
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Enter description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="count"
            label="Count"
            rules={[{ required: true, message: "Enter count" }]}
          >
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item
            name="skidka"
            label="Skidka (%)"
            rules={[{ required: true, message: "Enter discount" }]}
          >
            <InputNumber className="w-full" min={0} max={100} />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Select category" }]}
          >
            <Select placeholder="Select category">
              {categories?.data.map((cat: any) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="colorIds" label="Colors">
            <Select mode="multiple" placeholder="Select colors">
              {colors?.map((color: Color) => (
                <Select.Option key={color.id} value={color.id}>
                  {color.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;