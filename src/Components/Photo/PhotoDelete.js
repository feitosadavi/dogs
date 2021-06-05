import React from 'react';
import { PHOTO_DELETE } from '../../api';
import useFetch from '../../Hooks/useFetch';
import styles from './PhotoDelete.module.css';
import Loading from '../Helper/Loading';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';

const PhotoDelete = ({ id }) => {
  const { request, loading, error } = useFetch();
  const navigate = useNavigate();
  async function handleClick() {
    const confirm = window.confirm('Tem certeza que deseja excluir a foto?');

    if (confirm) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) navigate('/conta');
    } else {
      return false;
    }
  }

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <div>
      <button onClick={handleClick} className={styles.delete}>
        Deletar
      </button>
    </div>
  );
};

export default PhotoDelete;
