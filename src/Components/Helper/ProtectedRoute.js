import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { UserContext } from '../../UserContext';

function ProtectedRoute({ ...props }) {
  const { login } = React.useContext(UserContext);

  if (login) return <Route {...props} />;
  else if (!login) return <NavLink to="/login" />;
  else return null;
}

export default ProtectedRoute;
