import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  type TableProps,
  
} from "antd";
import { useState } from "react";
import useCategory from "./service/query/useCategory";
import useType from "./service/query/useType";
import useCreateCategory from "./service/mutation/CreateCategory";
interface DataSource {
  name: string;
  createdAt: string;
  type: string;
}

const Category = () => {
  const { data } = useCategory();
  const { data: typeData } = useType();
  const createCategory = useCreateCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleCreate = () => {
    form.validateFields().then((values) => {
      createCategory.mutate(values, {
        onSuccess: () => {
          setIsModalOpen(false);
          form.resetFields();
        },
        onError: (err) => {
          console.error( err);
        },
      });
    });
  };

  const dataSource: DataSource[] =
    data?.data.map((item) => ({
      name: item.name,
      createdAt: item.createdAt,
      type: item.type.name,
    })) || [];

  const columns: TableProps<DataSource>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      key: "action",
      render: (_, data) => (
        <Space>
          <Button type="primary" onClick={() => console.log("Edit", data)}>
            Edit
          </Button>
          <Button danger onClick={() => console.log("Delete", data)}>
            Delete
          </Button>
        </Space>
      ),
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
        rowKey="name"
      />

      <Modal
        title="Create Category"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleCreate}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input placeholder="Samsung" />
          </Form.Item>

          <Form.Item
            name="typeId"
            label="Select Type"
            rules={[{ required: true, message: "Please select a type" }]}
          >
            <Select placeholder="Select type">
              {typeData?.map((type: any) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
