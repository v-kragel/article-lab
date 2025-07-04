import { constantsMap, iconsMap, navigationMap } from "@/shared/model";

import type { SidebarItem } from "./types";

export const sidebarItems: SidebarItem[] = [
  {
    label: constantsMap.widgets.sidebar.nav.homeLink,
    to: navigationMap.home,
    icon: iconsMap.HomeIcon,
  },
  {
    label: constantsMap.widgets.sidebar.nav.fieldsLink,
    to: navigationMap.fields,
    icon: iconsMap.FieldIcon,
  },
  {
    label: constantsMap.widgets.sidebar.nav.templatesLink,
    to: navigationMap.templates,
    icon: iconsMap.TemplateIcon,
  },
];
