import React from "react";
import { Form, Input, Button } from "antd";

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { title: string }) => {
    onAddTask(values.title);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please input a task!" }]}
        label="Task Title"
      >
        <Input size="large" placeholder="Add a new task" autoFocus />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};
