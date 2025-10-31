import React from "react";
import { Form, Input, Button, Card } from "antd";
import styles from "./ServerCreateForm.module.scss";

interface ServerFormValues {
  name: string;
  host: string;
  port: number;
  password: string;
  rcon: string;
}

interface ServerCreateFormProps {
  onSubmit?: (values: ServerFormValues) => void;
  onCancel?: () => void;
}

export const ServerCreateForm: React.FC<ServerCreateFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: ServerFormValues) => {
    onSubmit?.(values);
  };

  return (
    <div className={styles.container}>
      <Card title="Create Server" className={styles.card}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Server Name"
            name="name"
            rules={[{ required: true, message: "Please input server name!" }]}
          >
            <Input placeholder="e.g., EU Server #1" size="large" />
          </Form.Item>

          <Form.Item
            label="Host"
            name="host"
            rules={[
              { required: true, message: "Please input host address!" },
              {
                pattern:
                  /^(\d{1,3}\.){3}\d{1,3}$|^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid IP or hostname!",
              },
            ]}
          >
            <Input
              placeholder="e.g., 192.168.1.1 or server.example.com"
              size="large"
            />
          </Form.Item>

          <Form.Item label="Port" name="port">
            <Input type="number" placeholder="e.g., 27015" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input server password!" },
            ]}
          >
            <Input.Password placeholder="Server password" size="large" />
          </Form.Item>

          <Form.Item
            label="RCON Password"
            name="rcon"
            rules={[{ required: true, message: "Please input RCON password!" }]}
          >
            <Input.Password placeholder="RCON password" size="large" />
          </Form.Item>

          <Form.Item className={styles.actions}>
            <Button onClick={onCancel} size="large">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              Create Server
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
