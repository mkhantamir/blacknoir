import React from "react";
import { Card, Button, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "./MatchCard.module.scss";

interface Match {
  _id: number;
  team1: {
    name: string;
  };
  team2: {
    name: string;
  };
  map?: string;
  status: "live" | "upcoming" | "finished";
  bestof: number;
}

interface MatchCardProps {
  match: any;
}

const getMapImage = (map?: string) => {
  if (!map) return null;
  // CS2 map images - you can replace these with actual paths
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

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const router = useRouter();

  const getStatusTag = () => {
    const statusConfig = {
      live: { color: "red", text: "LIVE" },
      upcoming: { color: "blue", text: "UPCOMING" },
      finished: { color: "default", text: "FINISHED" },
    };
    const config = statusConfig["live"];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  return (
    <Card className={styles.matchCard}>
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

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.matchInfo}>
            <span className={styles.bestof}>BO{match.bestof}</span>
            {match.map && (
              <span className={styles.map}>{match.map.toUpperCase()}</span>
            )}
          </div>
          <p>
            {match.server?.host}:{match.server?.port}
          </p>
          {getStatusTag()}
        </div>

        <div className={styles.teams}>
          <div className={styles.team}>
            <span className={styles.teamName}>{match.team1.name}</span>
            <span className={styles.score}>
              {match.event ? match.event.team1.score : ""}
            </span>
          </div>

          <div className={styles.vs}>VS</div>

          <div className={styles.team}>
            <span className={styles.teamName}>{match.team2.name}</span>
            <span className={styles.score}>
              {match.event ? match.event.team2.score : ""}
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => router.push(`/get6/matches/${match._id}`)}
            block
          >
            View Match
          </Button>
        </div>
      </div>
    </Card>
  );
};
