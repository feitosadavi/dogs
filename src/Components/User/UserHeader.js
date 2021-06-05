import React from 'react';
import UserNav from './UserNav';
import styles from './UserHeader.module.css';
import { useLocation } from 'react-router-dom';

function UserHeader() {
  const [title, setTitle] = React.useState('Minha conta');
  const location = useLocation();

  React.useEffect(() => {
    let { pathname } = location;
    switch (pathname) {
      case '/conta':
        setTitle('Minhas fotos');
        break;
      case '/conta/stats':
        setTitle('Estatísticas');
        break;
      case '/conta/post':
        setTitle('Adiciona Título');
        break;
      default:
        setTitle('Minha conta');
    }
  }, [location]);

  return (
    <section className={`animeLeft ${styles.header}`}>
      <h1 className="title">{title}</h1>
      <UserNav />
    </section>
  );
}

export default UserHeader;
