import React from "react";
import { Button } from "antd";
import { PlaySquareOutlined } from "@ant-design/icons";
import styles from "./Login.module.scss";

interface LoginContainerProps {
  onSteamLogin?: () => void;
}

export const LoginContainer: React.FC<LoginContainerProps> = ({
  onSteamLogin,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>GET6</h1>
        <p className={styles.subtitle}>CS2 Match Management System</p>
        <Button
          type="primary"
          size="large"
          icon={<PlaySquareOutlined />}
          onClick={onSteamLogin}
          className={styles.steamBtn}
        >
          Login with Steam
        </Button>
      </div>
    </div>
  );
};
