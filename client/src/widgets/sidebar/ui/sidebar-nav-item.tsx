import { useCallback } from "react";
import { NavLink } from "react-router-dom";

import clsx from "clsx";

import { Typography } from "@/shared/ui/typography";

import type { SidebarNavItemProps } from "../model";
import styles from "./sidebar.module.scss";

export const SidebarNavItem = ({ label, to, icon: Icon }: SidebarNavItemProps) => {
  const getLinkClass = useCallback(
    ({ isActive }: { isActive: boolean }) => clsx(styles.sidebar__link, isActive && styles.active),
    [],
  );

  return (
    <li>
      <NavLink to={to} className={getLinkClass}>
        {Icon && <Icon className={styles.sidebar__icon} />}
        <Typography variant="text">{label}</Typography>
      </NavLink>
    </li>
  );
};
