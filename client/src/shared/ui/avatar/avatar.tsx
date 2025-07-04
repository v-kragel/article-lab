import clsx from "clsx";

import { iconsMap } from "@/shared/model";

import styles from "./avatar.module.scss";
import type { AvatarProps } from "./types";

export const Avatar: React.FC<AvatarProps> = ({ src, alt, className }) => {
  return (
    <div className={clsx(styles.avatar, className)}>
      {src ? (
        <img src={src} alt={alt} className={styles.avatar__img} />
      ) : (
        <iconsMap.UserIcon className={styles.avatar__icon} />
      )}
    </div>
  );
};
