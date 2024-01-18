import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';

import { toast } from 'react-hot-toast';

import UserDisplay from './UserDisplay';

const HeaderContainer = styled.nav`
  display: flex;
  padding: 2rem 8rem;
  justify-content: space-between;
  font-size: 2rem;
  align-items: center;
  font-family: 'Oswald';
  & .title {
    font-size: 3rem;
    font-weight: 700;
  }
  & > *:hover {
    color: var(--dark-hover);
  }
  @media (max-width: 450px) {
    padding: 2rem 3rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();

  const handleSignOut = () => {
    const logOut = signOut();
    if (logOut) {
      toast.success('Logged Out!');
      navigate('/');
    }
  };

  return (
    <>
      <HeaderContainer>
        <Link to="/">
          <div className="title">RESTless Blogging</div>
        </Link>
        <ButtonsContainer>{isAuthenticated() ? <UserDisplay handleSignOut={handleSignOut} /> : <Link to="/login">Log In</Link>}</ButtonsContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
