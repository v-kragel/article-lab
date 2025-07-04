import { Outlet } from "react-router-dom";

import { Sidebar } from "@/widgets/sidebar";

import styles from "./layout.module.scss";

export const Layout: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
};
