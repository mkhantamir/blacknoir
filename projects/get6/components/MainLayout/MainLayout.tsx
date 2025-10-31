import React from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import styles from "./MainLayout.module.scss";

interface MainLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  onLogout,
}) => {
  return (
    <div className={styles.layout}>
      <Navbar onLogout={onLogout} />
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};
