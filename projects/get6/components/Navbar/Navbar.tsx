import React from "react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <span className={styles.logo}>GET6</span>
      </div>
      <div className={styles.right}>
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={onLogout}
          className={styles.logoutBtn}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};
