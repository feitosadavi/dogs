import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TOKEN_POST,
  USER_GET,
  TOKEN_VALIDATE_POST,
  USER_POST,
  PHOTOS_GET,
} from './api';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLogin(false);
      setLoading(false);

      window.localStorage.removeItem('token');

      navigate('/login');
    },
    [navigate]
  );

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();

    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setLoading(true);
      setError(null);

      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const { token } = await response.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function userPost(email, username, password) {
    try {
      setLoading(true);
      setError(null);

      const { url, options } = USER_POST({ email, username, password });
      const response = await fetch(url, options);
      const json = await response.json();

      if (!response.ok) throw new Error(json.message);

      await userLogin(username, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchPhotos() {
    const { url, options } = PHOTOS_GET({ page: 0, total: 6, user: 0 });
    const response = await fetch(url, options);
    const json = await response.json();
    return await json;
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);

          if (!response.ok) throw new Error('Token inválido');

          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{
        userLogin,
        userLogout,
        fetchPhotos,
        userPost,
        data,
        loading,
        login,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
