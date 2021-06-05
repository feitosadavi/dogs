import React from 'react';
import styles from './FeedPhotosItem.module.css';
import Image from '../Helper/Image';

const FeedPhotosItem = ({ post, setModal }) => {
  function handleClick() {
    setModal(post);
  }
  return (
    <li onClick={handleClick} className={styles.photo}>
      <Image src={post.src} alt={post.title} />
      <span>{post.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
