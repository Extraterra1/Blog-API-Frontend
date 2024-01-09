import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

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
  return (
    <>
      <HeaderContainer>
        <Link to="/">
          <div className="title">RESTless Blogging</div>
        </Link>
        <ButtonsContainer>
          <Link to="/posts">Blog Posts</Link>
          {isAuthenticated() ? <UserDisplay /> : <Link to="/login">Log In</Link>}
        </ButtonsContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
