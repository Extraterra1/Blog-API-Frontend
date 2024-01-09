import { Navigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

import Header from './Header';
import RegisterForm from './RegisterForm';

const Register = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <>
      {isAuthenticated() ? <Navigate to="/" /> : null}
      <Header />
      <main>
        <RegisterForm />
      </main>
    </>
  );
};

export default Register;
