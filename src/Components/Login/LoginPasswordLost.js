import React from 'react';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../Hooks/useForm';
import { PASSWORD_LOST } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

function LoginPasswordLost() {
  const login = useForm();
  const { request, data, loading, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar'),
      });
      await request(url, options);
    }
  }

  if (data)
    return <h1 className="title">{data.message ? data.message : data}</h1>;
  return (
    <section>
      <Head title="Recuperar senha" />

      <h1 className="title">Perdeu a senha?</h1>

      <form onSubmit={handleSubmit}>
        <Input label="Email / Usuário" type="text" id="login" {...login} />
        <Button disabled={loading}>Enviar Email</Button>
      </form>
      <Error error={error} />
    </section>
  );
}

export default LoginPasswordLost;
