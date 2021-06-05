import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../api';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import styles from './FeedPhotos.module.css';

function FeedPhotos({ user, page, setModal, setInfinite }) {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const total = 3;
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { json, response } = await request(url, options);
      if (response && response.ok && json.length < total) setInfinite(false);
    }
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <ul className={`${styles.feed}`}>
        {data.map((post) => (
          <FeedPhotosItem key={post.id} post={post} setModal={setModal} />
        ))}
      </ul>
    );
  } else return null;
}

export default FeedPhotos;
