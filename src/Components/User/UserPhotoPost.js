import React from 'react';
import styles from './UserPhotoPost.module.css';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../Hooks/useForm';
import { PHOTO_POST } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';

function UserPhotoPost() {
  const [img, setImg] = React.useState();
  const nome = useForm('text');
  const peso = useForm('number');
  const idade = useForm('number');
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();

    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(token, formData);
    await request(url, options);
    navigate('/conta');
  }

  function handleChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="Nome: " type="text" id="nome" {...nome} />
        <Input label="Peso: " type="number" id="peso" {...peso} />
        <Input label="Idade: " type="number" id="idade" {...idade} />

        <span
          className={`${styles.btn} ${styles.btnSuccess} ${styles.fileinputButton}`}
        >
          <span>Selecione o arquivo</span>

          <input
            className={styles.file}
            type="file"
            name="img"
            id="img"
            onChange={handleChange}
          />
        </span>

        <Button disabled={loading}>Enviar</Button>
        <Error error={error} />
      </form>

      {img && (
        <div
          className={styles.preview}
          style={{ backgroundImage: `url('${img.preview}')` }}
        ></div>
      )}
    </section>
  );
}

export default UserPhotoPost;
