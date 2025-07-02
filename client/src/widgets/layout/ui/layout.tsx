import { Outlet } from "react-router-dom";

import { Sidebar } from "@/widgets/sidebar";

export const Layout: React.FC = () => {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
