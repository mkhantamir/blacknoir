import React from "react";
import { Card, Button, Select, Space } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { MatchCard } from "../MatchCard";
import styles from "./MatchList.module.scss";

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

interface MatchListProps {
  matches?: Match[];
  onFilterChange?: (status: string) => void;
}

export const MatchList: React.FC<MatchListProps> = ({
  matches = [],
  onFilterChange,
}) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Card
        title="Matches"
        extra={
          <Space>
            <Select
              placeholder="Filter by status"
              style={{ width: 150 }}
              allowClear
              onChange={onFilterChange}
              options={[
                { value: "live", label: "Live" },
                { value: "upcoming", label: "Upcoming" },
                { value: "finished", label: "Finished" },
              ]}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => router.push("/matches/create")}
            >
              Create Match
            </Button>
          </Space>
        }
        className={styles.card}
      >
        {matches.length === 0 ? (
          <div className={styles.empty}>
            <p>No matches found</p>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => router.push("/get6/matches/create")}
            >
              Create Your First Match
            </Button>
          </div>
        ) : (
          <div className={styles.grid}>
            {matches.map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
