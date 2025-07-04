import clsx from "clsx";

import type { TypographyProps } from "./types";
import styles from "./typography.module.scss";

export const Typography = ({ children, variant = "text", className }: TypographyProps) => {
  const Tag = variant === "subheading" ? "h2" : "span";

  return <Tag className={clsx(styles[variant], className)}>{children}</Tag>;
};
