import React, { useState } from "react";
import { Table, Button, Space, Form, Input, Card, Tag } from "antd";
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "./TeamList.module.scss";

interface Player {
  steam64: string;
  name: string;
}

interface Team {
  _id: number;
  name: string;
  tag: string;
  players: Player[];
}

interface TeamListProps {
  teams?: Team[];
  onUpdate?: (id: number, values: Partial<Team>) => void;
  onDelete?: (id: number) => void;
}

export const TeamList: React.FC<TeamListProps> = ({
  teams = [],
  onUpdate,
  onDelete,
}) => {
  const router = useRouter();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [form] = Form.useForm();

  const isEditing = (record: Team) => record._id === editingKey;

  const edit = (record: Team) => {
    form.setFieldsValue({
      name: record.name,
      tag: record.tag,
      players: record.players,
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const save = async (id: number) => {
    try {
      const values = await form.validateFields();
      onUpdate?.(id, values);
      setEditingKey(null);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Team Name",
      dataIndex: "name",
      key: "name",
      width: "35%",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      width: "15%",
      render: (tag: string) => <Tag color="blue">{tag}</Tag>,
    },
    {
      title: "Players",
      key: "players",
      width: "35%",
      render: (_: any, record: Team) => (
        <span>{record.players.length} players</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_: any, record: Team) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              icon={<SaveOutlined />}
              type="link"
              onClick={() => save(record._id)}
            >
              Save
            </Button>
            <Button icon={<CloseOutlined />} type="link" onClick={cancel}>
              Cancel
            </Button>
          </Space>
        ) : (
          <Button
            icon={<EditOutlined />}
            type="link"
            disabled={editingKey !== null}
            onClick={() => edit(record)}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  const expandedRowRender = (record: Team) => {
    const editable = isEditing(record);

    if (editable) {
      return (
        <div className={styles.expandedEdit}>
          <Form form={form} component={false}>
            <div className={styles.basicFields}>
              <Form.Item
                name="name"
                label="Team Name"
                rules={[{ required: true, message: "Please input team name!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="tag"
                label="Team Tag"
                rules={[
                  { required: true, message: "Please input team tag!" },
                  { max: 10, message: "Tag must be maximum 10 characters!" },
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </div>

            <div className={styles.playersSection}>
              <h4>Players (Minimum 5)</h4>
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
                            <Input placeholder="76561198..." />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, "name"]}
                            rules={[{ required: true, message: "Required" }]}
                            className={styles.nameField}
                          >
                            <Input placeholder="Player name" />
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
                      >
                        Add Player
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </Form>
        </div>
      );
    }

    return (
      <div className={styles.expandedView}>
        <div className={styles.teamInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Team Tag:</span>
            <span className={styles.value}>
              <Tag color="blue">{record.tag}</Tag>
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Total Players:</span>
            <span className={styles.value}>{record.players.length}</span>
          </div>
        </div>

        <div className={styles.playersTable}>
          <h4>Players</h4>
          <table>
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Steam64 ID</th>
              </tr>
            </thead>
            <tbody>
              {record.players.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td className={styles.steam64}>{player.steam64}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Card
        title="Teams"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push("/get6/teams/create")}
          >
            Create Team
          </Button>
        }
        className={styles.card}
      >
        <Table
          columns={columns}
          dataSource={teams}
          rowKey="id"
          expandable={{
            expandedRowRender,
            expandRowByClick: true,
          }}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};
