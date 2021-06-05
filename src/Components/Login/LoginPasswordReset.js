import React from 'react';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../Hooks/useForm';
import { PASSWORD_RESET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';

function LoginPasswordReset() {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const { request, loading, error } = useFetch();
  const password = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function resetPassword(event) {
    event.preventDefault();
    const { url, options } = PASSWORD_RESET({
      login,
      key,
      password: password.value,
    });
    const { response } = await request(url, options);

    if (response.ok) navigate('/conta');
  }

  return (
    <section className="container mainContainer animeLeft">
      <h1 className="title">Reset a senha</h1>
      <form onSubmit={resetPassword}>
        <Head title="Recuperar senha" />

        <Input label="Nova Senha" id="password" type="password" {...password} />
        <Button disabled={loading}>Confirmar</Button>
        <Error error={error} />
      </form>
    </section>
  );
}

export default LoginPasswordReset;
