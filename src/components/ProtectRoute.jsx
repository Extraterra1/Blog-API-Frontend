import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const { pathname } = useLocation();
  return <>{isAuthenticated() ? children : <Navigate to="/login" state={{ pathname }} />}</>;
};

ProtectRoute.propTypes = {
  children: PropTypes.element
};

export default ProtectRoute;
