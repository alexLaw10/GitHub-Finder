import type { HTMLAttributes } from 'react';
import styles from './Card.module.scss';

type CardProps = HTMLAttributes<HTMLDivElement>;

function CardRoot({ className, ...props }: CardProps) {
  return <div className={[styles.card, className].filter(Boolean).join(' ')} {...props} />;
}

function CardBody({ className, ...props }: CardProps) {
  return <div className={[styles['card__body'], className].filter(Boolean).join(' ')} {...props} />;
}

interface CardTitleProps extends CardProps {
  as?: 'h2' | 'h3' | 'h4';
}

function CardTitle({ as: Tag = 'h3', className, ...props }: CardTitleProps) {
  return <Tag className={[styles['card__title'], className].filter(Boolean).join(' ')} {...props} />;
}

function CardText({ className, ...props }: CardProps) {
  return <p className={[styles['card__text'], className].filter(Boolean).join(' ')} {...props} />;
}

export const Card = Object.assign(CardRoot, {
  Body: CardBody,
  Title: CardTitle,
  Text: CardText,
});
