import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import styles from './styles.module.css';

export function Home() {
  const [input, setInput] = useState('');

  const navigate = useNavigate();

  function handleSubmitToLocalStorage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!input) {
      alert('Ops! Primeiro digite seu nome');
      return null;
    }

    window.localStorage.setItem('name', input);
    alert('Seu nome foi salvo com sucesso');

    navigate('/game');
    setInput('');
  }

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Baralho de cartas aleatórias</h2>

      <form className={styles.form} onSubmit={handleSubmitToLocalStorage}>
        <input
          type="text"
          placeholder="Digite seu nome"
          className={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button name="Ver cartas" type="submit" />
      </form>
    </main>
  );
}
