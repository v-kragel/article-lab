import { constantsMap } from "@/shared/model";
import { Avatar } from "@/shared/ui/avatar";
import { Typography } from "@/shared/ui/typography";

import { sidebarItems } from "../model";
import { SidebarNavItem } from "./sidebar-nav-item";
import styles from "./sidebar.module.scss";

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__user}>
        <Avatar />
        <Typography variant="text">{constantsMap.widgets.sidebar.user.defaultText}</Typography>
      </div>

      <nav className={styles.sidebar__menu} role="navigation" aria-label="Main sidebar">
        <h2 className={styles.sidebar__subheading}>
          <Typography variant="subheading">
            {constantsMap.widgets.sidebar.subheadings.pagesText}
          </Typography>
        </h2>
        <ul className={styles.sidebar__list}>
          {sidebarItems.map((item) => (
            <SidebarNavItem key={`${item.to}-${item.label}`} {...item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};
