import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  return <>{isAuthenticated() ? children : <Navigate to="/login" />}</>;
};

ProtectRoute.propTypes = {
  children: PropTypes.element
};

export default ProtectRoute;
