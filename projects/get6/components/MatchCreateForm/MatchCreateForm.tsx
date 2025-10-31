import React, { useState } from "react";
import { Form, Select, Button, Card, Radio, Space, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./MatchCreateForm.module.scss";

interface Spectator {
  steam64: string;
  name: string;
}

interface MatchFormValues {
  team1_id: number;
  team2_id: number;
  server_id: number;
  season_id: number;
  bestof: number;
  maplist: string[];
  mapsides: string[];
  spectators: Spectator[];
}

interface MatchCreateFormProps {
  teams?: Array<{ _id: number; name: string }>;
  servers?: Array<{ _id: number; name: string }>;
  seasons?: Array<{ _id: number; name: string }>;
  onSubmit?: (values: MatchFormValues) => void;
  onCancel?: () => void;
}

const MAPS = [
  "ancient",
  "overpass",
  "train",
  "dust2",
  "mirage",
  "inferno",
  "nuke",
];
const BESTOF_OPTIONS = [1, 3, 5, 7];

export const MatchCreateForm: React.FC<MatchCreateFormProps> = ({
  teams = [],
  servers = [],
  seasons = [],
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [bestof, setBestof] = useState<number>(1);
  const [team1Name, setTeam1Name] = useState<string>("");
  const [team2Name, setTeam2Name] = useState<string>("");

  const handleBestofChange = (value: number) => {
    setBestof(value);
    // Reset maplist and mapsides when bestof changes
    form.setFieldsValue({
      maplist: Array(value).fill(""),
      mapsides: Array(value).fill(""),
    });
  };

  const handleTeam1Change = (value: number) => {
    const team = teams.find((t) => t._id === value);
    setTeam1Name(team?.name || "");
  };

  const handleTeam2Change = (value: number) => {
    const team = teams.find((t) => t._id === value);
    setTeam2Name(team?.name || "");
  };

  const handleFinish = (values: MatchFormValues) => {
    onSubmit?.(values);
  };

  return (
    <div className={styles.container}>
      <Card title="Create Match" className={styles.card}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          autoComplete="off"
          initialValues={{
            bestof: 1,
            maplist: [""],
            mapsides: [""],
            spectators: [{ steam64: "", name: "" }],
          }}
        >
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Match Details</h3>
            <div className={styles.formGrid}>
              <Form.Item
                label="Team 1"
                name="team1_id"
                rules={[{ required: true, message: "Please select team 1!" }]}
              >
                <Select
                  placeholder="Select team 1"
                  size="large"
                  onChange={handleTeam1Change}
                  options={teams.map((team) => ({
                    value: team._id,
                    label: team.name,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Team 2"
                name="team2_id"
                rules={[{ required: true, message: "Please select team 2!" }]}
              >
                <Select
                  placeholder="Select team 2"
                  size="large"
                  onChange={handleTeam2Change}
                  options={teams.map((team) => ({
                    value: team._id,
                    label: team.name,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Server"
                name="server_id"
                rules={[{ required: true, message: "Please select server!" }]}
              >
                <Select
                  placeholder="Select server"
                  size="large"
                  options={servers.map((server) => ({
                    value: server._id,
                    label: server.name,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Season"
                name="season_id"
                rules={[{ required: true, message: "Please select season!" }]}
              >
                <Select
                  placeholder="Select season"
                  size="large"
                  options={seasons.map((season) => ({
                    value: season._id,
                    label: season.name,
                  }))}
                />
              </Form.Item>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Format</h3>
            <Form.Item
              label="Best Of"
              name="bestof"
              rules={[{ required: true, message: "Please select best of!" }]}
            >
              <Radio.Group
                onChange={(e) => handleBestofChange(e.target.value)}
                size="large"
                buttonStyle="solid"
              >
                {BESTOF_OPTIONS.map((option) => (
                  <Radio.Button key={option} value={option}>
                    BO{option}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Map Selection</h3>
            <div className={styles.mapsSection}>
              {Array.from({ length: bestof }).map((_, index) => (
                <div key={index} className={styles.mapRow}>
                  <div className={styles.mapHeader}>
                    <span className={styles.mapNumber}>Map {index + 1}</span>
                  </div>

                  <div className={styles.mapFields}>
                    <Form.Item
                      label="Map"
                      name={["maplist", index]}
                      rules={[{ required: true, message: "Select map!" }]}
                      className={styles.mapSelect}
                    >
                      <Select
                        placeholder="Select map"
                        size="large"
                        options={MAPS.map((map) => ({
                          value: map,
                          label: map.toUpperCase(),
                        }))}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Starting CT Side"
                      name={["mapsides", index]}
                      rules={[{ required: true, message: "Select CT team!" }]}
                      className={styles.sideSelect}
                    >
                      <Select
                        placeholder="Select CT team"
                        size="large"
                        disabled={!team1Name || !team2Name}
                        options={[
                          { value: "team1_ct", label: team1Name || "Team 1" },
                          { value: "team2_ct", label: team2Name || "Team 2" },
                          { value: "knife", label: "Knife" },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Spectators</h3>
            <Form.List name="spectators">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className={styles.spectatorRow}>
                      <Space
                        align="start"
                        size="middle"
                        className={styles.spectatorFields}
                      >
                        <Form.Item
                          {...field}
                          label={field.key === 0 ? "Steam64 ID" : ""}
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
                          label={field.key === 0 ? "Name" : ""}
                          name={[field.name, "name"]}
                          rules={[{ required: true, message: "Required" }]}
                          className={styles.nameField}
                        >
                          <Input placeholder="Spectator name" size="large" />
                        </Form.Item>

                        {fields.length > 1 && (
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
                      Add Spectator
                    </Button>
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
              Create Match
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
