import React from 'react';
import useForm from '../../Hooks/useForm';
import Button from '../Form/Button';
import Input from '../Form/Input';
import { UserContext } from '../../UserContext';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

function LoginCreate() {
  const email = useForm('email');
  const username = useForm();
  const password = useForm();

  const { userPost, error, loading } = React.useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault(event);
    userPost(email.value, username.value, password.value);
  }

  return (
    <section className="animeLeft">
      <Head title="Cadastro" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Error error={error} />
        <Input label="Email: " id="email" type="email" {...email} />
        <Input label="Usuário: " id="username" type="text" {...username} />
        <Input label="Senha: " id="password" type="password" {...password} />
        <Button disabled={loading}>Cadastrar</Button>
      </form>
    </section>
  );
}

export default LoginCreate;
