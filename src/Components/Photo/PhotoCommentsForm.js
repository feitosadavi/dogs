import React from 'react';
import { COMMENT_POST } from '../../api';
import useFetch from '../../Hooks/useFetch';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import styles from './PhotoCommentsForm.module.css';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading'

const PhotoCommentsForm = ({ id, setComments, comments, single }) => {
  const [comment, setComment] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { request, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    const { url, options, loading } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);

    if (response.ok) {
      setComment('');
      setComments((comments) => [...comments, json]);
    }
    setLoading(loading);
  }

  return (
    <form
      className={`${styles.commentsForm} ${single ? styles.single : ''}`}
      onSubmit={handleSubmit}
    >
      <textarea
        name="comment"
        id="comment"
        placeholder="Comente..."
        className={styles.textarea}
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      {loading ? <Loading /> : <button className={styles.commentBtn} >
        <Enviar />
      </button>}

      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
