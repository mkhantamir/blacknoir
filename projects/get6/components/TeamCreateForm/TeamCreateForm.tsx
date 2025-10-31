import React from "react";
import { Form, Input, Button, Card, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./TeamCreateForm.module.scss";

interface Player {
  steam64: string;
  name: string;
}

interface TeamFormValues {
  name: string;
  tag: string;
  players: Player[];
}

interface TeamCreateFormProps {
  onSubmit?: (values: TeamFormValues) => void;
  onCancel?: () => void;
}

export const TeamCreateForm: React.FC<TeamCreateFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: TeamFormValues) => {
    onSubmit?.(values);
  };

  return (
    <div className={styles.container}>
      <Card title="Create Team" className={styles.card}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          autoComplete="off"
          initialValues={{
            players: [
              { steam64: "", name: "" },
              { steam64: "", name: "" },
              { steam64: "", name: "" },
              { steam64: "", name: "" },
              { steam64: "", name: "" },
            ],
          }}
        >
          <Form.Item
            label="Team Name"
            name="name"
            rules={[{ required: true, message: "Please input team name!" }]}
          >
            <Input placeholder="e.g., Team Liquid" size="large" />
          </Form.Item>

          <Form.Item
            label="Team Tag"
            name="tag"
            rules={[
              { required: true, message: "Please input team tag!" },
              { max: 10, message: "Tag must be maximum 10 characters!" },
            ]}
          >
            <Input placeholder="e.g., TL" size="large" maxLength={10} />
          </Form.Item>

          <div className={styles.playersSection}>
            <h3 className={styles.sectionTitle}>Players (Minimum 5)</h3>

            <Form.List
              name="players"
              rules={[
                {
                  validator: async (_, players) => {
                    if (!players || players.length < 5) {
                      return Promise.reject(
                        new Error("At least 5 players required")
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key} className={styles.playerRow}>
                      <Space
                        align="start"
                        size="middle"
                        className={styles.playerFields}
                      >
                        <Form.Item
                          {...field}
                          label={index === 0 ? "Steam64 ID" : ""}
                          name={[field.name, "steam64"]}
                          rules={[
                            { required: true, message: "Required" },
                            {
                              pattern: /^[0-9]{17}$/,
                              message: "Must be 17 digits",
                            },
                          ]}
                          className={styles.steam64Field}
                        >
                          <Input placeholder="76561198..." size="large" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          label={index === 0 ? "Player Name" : ""}
                          name={[field.name, "name"]}
                          rules={[{ required: true, message: "Required" }]}
                          className={styles.nameField}
                        >
                          <Input placeholder="Player name" size="large" />
                        </Form.Item>

                        {fields.length > 5 && (
                          <MinusCircleOutlined
                            className={styles.removeIcon}
                            onClick={() => remove(field.name)}
                          />
                        )}
                      </Space>
                    </div>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      size="large"
                    >
                      Add Player
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          <Form.Item className={styles.actions}>
            <Button onClick={onCancel} size="large">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              Create Team
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
