import React from "react";
import { Form, Input, Button, Card } from "antd";
import styles from "./SeasonCreateForm.module.scss";

interface SeasonCreateFormProps {
  onSubmit?: (values: { name: string }) => void;
  onCancel?: () => void;
}

export const SeasonCreateForm: React.FC<SeasonCreateFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: { name: string }) => {
    onSubmit?.(values);
  };

  return (
    <div className={styles.container}>
      <Card title="Create Season" className={styles.card}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Season Name"
            name="name"
            rules={[{ required: true, message: "Please input season name!" }]}
          >
            <Input placeholder="e.g., Season 1, Winter 2024" size="large" />
          </Form.Item>

          <Form.Item className={styles.actions}>
            <Button onClick={onCancel} size="large">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              Create Season
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
