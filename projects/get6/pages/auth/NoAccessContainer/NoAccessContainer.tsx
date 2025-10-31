import React from "react";
import { Button, Result } from "antd";
import { LockOutlined } from "@ant-design/icons";
import styles from "./NoAccessContainer.module.scss";

interface NoAccessContainerProps {
  onLogout?: () => void;
}

export const NoAccessContainer: React.FC<NoAccessContainerProps> = ({
  onLogout,
}) => {
  return (
    <div className={styles.container}>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you don't have access to this page."
        icon={<LockOutlined />}
        extra={
          <Button type="primary" size="large" onClick={onLogout}>
            Logout
          </Button>
        }
      />
    </div>
  );
};
