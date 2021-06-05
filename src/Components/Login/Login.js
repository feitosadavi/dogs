import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { NavLink} from 'react-router-dom';
import { UserContext } from '../../UserContext';
import LoginCreate from './LoginCreate';
import LoginForm from './LoginForm';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';
import styles from './Login.module.css';
import NotFound from '../../NotFound';
import Loading from '../Helper/Loading';

function Login() {
  const { login, loading } = React.useContext(UserContext);

  if (loading)
    return (
      <Loading />
    );
  if (login === true) return <NavLink to="/conta" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
}

export default Login;