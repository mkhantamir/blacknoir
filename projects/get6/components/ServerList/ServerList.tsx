import React, { useState } from "react";
import { Table, Button, Space, Form, Input, Card, Tag } from "antd";
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "./ServerList.module.scss";

interface Server {
  _id: number;
  name: string;
  host: string;
  port: number;
  password: string;
  rcon: string;
  status?: "online" | "offline";
}

interface ServerListProps {
  servers?: Server[];
  onUpdate?: (id: number, values: Partial<Server>) => void;
  onDelete?: (id: number) => void;
}

export const ServerList: React.FC<ServerListProps> = ({
  servers = [],
  onUpdate,
  onDelete,
}) => {
  const router = useRouter();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [form] = Form.useForm();

  const isEditing = (record: Server) => record._id === editingKey;

  const edit = (record: Server) => {
    form.setFieldsValue({
      name: record.name,
      host: record.host,
      port: record.port,
      password: record.password,
      rcon: record.rcon,
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Host",
      dataIndex: "host",
      key: "host",
      width: "20%",
    },
    {
      title: "Port",
      dataIndex: "port",
      key: "port",
      width: "10%",
    },
    {
      title: "Status",
      key: "status",
      width: "10%",
      render: (_: any, record: Server) => (
        <Tag color={record.status === "online" ? "green" : "red"}>
          {record.status?.toUpperCase() || "UNKNOWN"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_: any, record: Server) => {
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

  const expandedRowRender = (record: Server) => {
    const editable = isEditing(record);

    if (editable) {
      return (
        <div className={styles.expandedEdit}>
          <Form form={form} component={false}>
            <div className={styles.formGrid}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please input name!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="host"
                label="Host"
                rules={[{ required: true, message: "Please input host!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="port"
                label="Port"
                rules={[{ required: true, message: "Please input port!" }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please input password!" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="rcon"
                label="RCON"
                rules={[{ required: true, message: "Please input RCON!" }]}
              >
                <Input.Password />
              </Form.Item>
            </div>
          </Form>
        </div>
      );
    }

    return (
      <div className={styles.expandedView}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Host:</span>
            <span className={styles.value}>{record.host}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Port:</span>
            <span className={styles.value}>{record.port}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Password:</span>
            <span className={styles.value}>••••••••</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>RCON:</span>
            <span className={styles.value}>••••••••</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Card
        title="Servers"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push("/get6/servers/create")}
          >
            Create Server
          </Button>
        }
        className={styles.card}
      >
        <Table
          columns={columns}
          dataSource={servers}
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
