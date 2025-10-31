import React, { useState } from "react";
import { Card, Button, Table, Modal, Space, Tag, Upload } from "antd";
import {
  ControlOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  StopOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import styles from "./MatchDetail.module.scss";

interface PlayerStats {
  name: string;
  kills: number;
  deaths: number;
  assists: number;
  damage: number;
}

interface Match {
  _id: number;
  team1: {
    name: string;
    score: number;
    players: PlayerStats[];
  };
  team2: {
    name: string;
    score: number;
    players: PlayerStats[];
  };
  map?: string;
  status: "live" | "upcoming" | "finished";
  bestof: number;
}

interface MatchDetailProps {
  match?: Match;
  event?: any;
  server?: any;
  onEndMatch?: () => void;
  onForcePause?: () => void;
  onForceUnpause?: () => void;
  onForceStart?: () => void;
  onLoadJson?: () => void;
}

const getMapImage = (map?: string) => {
  if (!map) return null;
  const mapImages: Record<string, string> = {
    ancient: "/maps/ancient.jpg",
    overpass: "/maps/overpass.jpg",
    train: "/maps/train.jpg",
    dust2: "/maps/dust2.jpg",
    mirage: "/maps/mirage.jpg",
    inferno: "/maps/inferno.jpg",
    nuke: "/maps/nuke.jpg",
  };
  return mapImages[map.toLowerCase()] || null;
};

export const MatchDetail: React.FC<MatchDetailProps> = ({
  match,
  event,
  server,
  onEndMatch,
  onForcePause,
  onForceUnpause,
  onForceStart,
  onLoadJson,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!match) {
    return <div>Match not found</div>;
  }

  const getStatusTag = () => {
    const statusConfig = {
      live: { color: "red", text: "LIVE" },
      upcoming: { color: "blue", text: "UPCOMING" },
      finished: { color: "default", text: "FINISHED" },
    };
    const config = statusConfig["live"];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: "Player",
      dataIndex: "name",
      key: "name",
      width: "35%",
    },
    {
      title: "K",
      dataIndex: "kills",
      key: "kills",
      width: "15%",
      sorter: (a: PlayerStats, b: PlayerStats) => a.kills - b.kills,
    },
    {
      title: "D",
      dataIndex: "deaths",
      key: "deaths",
      width: "15%",
      sorter: (a: PlayerStats, b: PlayerStats) => a.deaths - b.deaths,
    },
    {
      title: "A",
      dataIndex: "assists",
      key: "assists",
      width: "15%",
      sorter: (a: PlayerStats, b: PlayerStats) => a.assists - b.assists,
    },
    {
      title: "DMG",
      dataIndex: "damage",
      key: "damage",
      width: "20%",
      sorter: (a: PlayerStats, b: PlayerStats) => a.damage - b.damage,
    },
  ];

  return (
    <div className={styles.container}>
      {/* Match Header */}
      <Card className={styles.headerCard}>
        <div
          className={styles.mapBackground}
          style={{
            backgroundImage: match.map
              ? `url(${getMapImage(match.map)})`
              : "none",
          }}
        >
          <div className={styles.overlay} />
        </div>

        <div className={styles.headerContent}>
          <div className={styles.matchInfo}>
            <div className={styles.topInfo}>
              <span className={styles.bestof}>BO{match.bestof}</span>
              {match.map && (
                <span className={styles.map}>{match.map.toUpperCase()}</span>
              )}
              {getStatusTag()}
              <p>Match ID: {match._id}</p>
              <p>
                {server?.host}:{server?.port}
              </p>
            </div>

            <div className={styles.teams}>
              <div className={styles.team}>
                <span className={styles.teamName}>{match.team1.name}</span>
                <span className={styles.score}>
                  {event ? event.team1.score : ""}
                </span>
              </div>

              <div className={styles.vs}>VS</div>

              <div className={styles.team}>
                <span className={styles.teamName}>{match.team2.name}</span>
                <span className={styles.score}>
                  {event ? event.team2.score : ""}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              type="primary"
              icon={<ControlOutlined />}
              size="large"
              onClick={() => setIsModalOpen(true)}
            >
              Match Actions
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Tables */}
      <div className={styles.statsSection}>
        <Card
          title={match.team1.name}
          className={styles.statsCard}
          headStyle={{ background: "#1890ff", color: "#fff" }}
        >
          <Table
            columns={columns}
            dataSource={
              event
                ? event.team1.players.map((player: any) => ({
                    name: player.name,
                    kills: player.stats.kills,
                    deaths: player.stats.deaths,
                    assists: player.stats.assists,
                    damage: player.stats.damage,
                  }))
                : match.team1.players
            }
            rowKey="name"
            pagination={false}
            size="middle"
          />
        </Card>

        <Card
          title={match.team2.name}
          className={styles.statsCard}
          headStyle={{ background: "#ff4d4f", color: "#fff" }}
        >
          <Table
            columns={columns}
            dataSource={
              event
                ? event.team2.players.map((player: any) => ({}))
                : match.team2.players
            }
            rowKey="name"
            pagination={false}
            size="middle"
          />
        </Card>
      </div>

      {/* Actions Modal */}
      <Modal
        title="Match Actions"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={400}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Button
            type="primary"
            danger
            icon={<StopOutlined />}
            onClick={() => {
              onEndMatch?.();
              setIsModalOpen(false);
            }}
            block
            size="large"
          >
            End Match
          </Button>

          <Button
            icon={<PauseCircleOutlined />}
            onClick={() => {
              onForcePause?.();
              setIsModalOpen(false);
            }}
            block
            size="large"
          >
            Force Pause
          </Button>

          <Button
            icon={<PlayCircleOutlined />}
            onClick={() => {
              onForceUnpause?.();
              setIsModalOpen(false);
            }}
            block
            size="large"
          >
            Force Unpause
          </Button>

          <Button
            icon={<PlayCircleOutlined />}
            onClick={() => {
              onForceStart?.();
              setIsModalOpen(false);
            }}
            block
            size="large"
          >
            Force Start
          </Button>

          <Button
            icon={<PlayCircleOutlined />}
            onClick={() => {
              onLoadJson?.();
              setIsModalOpen(false);
            }}
            block
            size="large"
          >
            Load match
          </Button>
        </Space>
      </Modal>
    </div>
  );
};
