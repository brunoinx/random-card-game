import { valueCardSwitch } from '../../utils/valueCardSwitch';
import styles from './styles.module.css';

export interface CardProps {
  code?: string;
  name: string;
  description: string;
  image: string;
  value: number | string; // De 0 a 10
}

export function Card({ name, description, image: Image, value }: CardProps) {
  const valueCard = valueCardSwitch(value);

  return (
    <div className={styles.container}>
      <img src={Image} alt={name} className={styles.img} />

      <div className={styles.content}>
        <div className={styles.info}>
          <h4>{name}</h4>

          <span>{description}</span>
        </div>

        <span>{valueCard}</span>
      </div>
    </div>
  );
}
