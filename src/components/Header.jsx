import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { Toaster, toast } from 'react-hot-toast';

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
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const Header = () => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const [logged, setLogged] = useState(isAuthenticated());

  const handleSignOut = () => {
    const logOut = signOut();
    if (logOut) {
      toast.success('Logged Out!');
      setLogged(isAuthenticated());
    }
  };

  return (
    <>
      <Toaster />
      <HeaderContainer>
        <Link to="/">
          <div className="title">RESTless Blogging</div>
        </Link>
        <ButtonsContainer>
          <Link to="/posts">Blog Posts</Link>
          {logged ? <UserDisplay handleSignOut={handleSignOut} /> : <Link to="/login">Log In</Link>}
        </ButtonsContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
