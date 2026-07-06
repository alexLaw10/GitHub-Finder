import styles from './Avatar.module.scss';

interface AvatarProps {
  src: string;
  alt: string;
}

export function Avatar({ src, alt }: AvatarProps) {
  return <img src={src} alt={alt} className={styles.avatar} />;
}
