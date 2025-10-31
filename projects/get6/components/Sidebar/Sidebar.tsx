import React from "react";
import { Menu } from "antd";
import { useRouter } from "next/router";
import {
  TrophyOutlined,
  TeamOutlined,
  DatabaseOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import styles from "./Sidebar.module.scss";

export const Sidebar: React.FC = () => {
  const router = useRouter();

  const menuItems = [
    {
      key: "/get6/seasons",
      icon: <TrophyOutlined />,
      label: "Seasons",
    },
    {
      key: "/get6/teams",
      icon: <TeamOutlined />,
      label: "Teams",
    },
    {
      key: "/get6/servers",
      icon: <DatabaseOutlined />,
      label: "Servers",
    },
    {
      key: "/get6/matches",
      icon: <UnorderedListOutlined />,
      label: "Matches",
    },
    {
      key: "/get6/events",
      icon: <CalendarOutlined />,
      label: "Events",
    },
    {
      key: "/get6/matches/create",
      icon: <PlusCircleOutlined />,
      label: "Create Match",
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key);
  };

  return (
    <aside className={styles.sidebar}>
      <Menu
        mode="inline"
        selectedKeys={[router.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        className={styles.menu}
      />
    </aside>
  );
};
