import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

export function Button({ name, ...rest }: ButtonProps) {
  return (
    <button className={styles.button} {...rest}>
      {name}
    </button>
  );
}
