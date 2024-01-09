import { Navigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

import Header from './Header';

const Register = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <>
      {isAuthenticated() ? <Navigate to="/" /> : null}
      <Header />
      <main />
    </>
  );
};

export default Register;
