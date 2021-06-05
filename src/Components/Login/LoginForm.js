import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Form/Button';
import Input from '../Form/Input';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Error from '../Helper/Error';
import styles from './LoginForm.module.css';
import stylesBtn from '../Form/Button.module.css';
import Head from '../Helper/Head';

function LoginForm() {
  const username = useForm();
  const password = useForm();

  const { userLogin, loading, error } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input id="username" label="Username: " type="text" {...username} />
        <Input id="password" label="Password: " type="password" {...password} />
        <Button disabled={loading}>Entrar</Button>
      </form>
      <Error error={error && 'Dados incorretos'} />
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
      <Link className={styles.perdeu} to="perdeu">
        Perdeu a senha?
      </Link>
    </section>
  );
}

export default LoginForm;
