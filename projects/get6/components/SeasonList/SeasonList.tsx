import React, { useState } from "react";
import { Table, Button, Space, Form, Input, Card } from "antd";
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "./SeasonList.module.scss";

interface Season {
  _id: number;
  name: string;
  createdAt?: string;
}

interface SeasonListProps {
  seasons?: Season[];
  onUpdate?: (id: number, values: Partial<Season>) => void;
  onDelete?: (id: number) => void;
}

export const SeasonList: React.FC<SeasonListProps> = ({
  seasons = [],
  onUpdate,
  onDelete,
}) => {
  const router = useRouter();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [form] = Form.useForm();

  const isEditing = (record: Season) => record._id === editingKey;

  const edit = (record: Season) => {
    form.setFieldsValue({
      name: record.name,
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
      title: "Season Name",
      dataIndex: "name",
      key: "name",
      width: "60%",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "25%",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "-",
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_: any, record: Season) => {
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

  const expandedRowRender = (record: Season) => {
    const editable = isEditing(record);

    if (editable) {
      return (
        <div className={styles.expandedEdit}>
          <Form form={form} component={false}>
            <Form.Item
              name="name"
              label="Season Name"
              rules={[{ required: true, message: "Please input season name!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      );
    }

    return (
      <div className={styles.expandedView}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Name:</span>
            <span className={styles.value}>{record.name}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>ID:</span>
            <span className={styles.value}>{record._id}</span>
          </div>
          {record.createdAt && (
            <div className={styles.infoItem}>
              <span className={styles.label}>Created:</span>
              <span className={styles.value}>
                {new Date(record.createdAt).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Card
        title="Seasons"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push("/get6/seasons/create")}
          >
            Create Season
          </Button>
        }
        className={styles.card}
      >
        <Table
          columns={columns}
          dataSource={seasons}
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
