import React from 'react';
import styles from './FeedModal.module.css';
import PhotoContent from '../Photo/PhotoContent';
import { PHOTO_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';

function FeedModal({ modal, setModal }) {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(modal.id);
    request(url, options);
  }, [modal, request]);

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) setModal(null);
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}{' '}
    </div>
  );
}

export default FeedModal;
