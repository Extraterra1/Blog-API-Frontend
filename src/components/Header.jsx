import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <Link to="/">
          <div className="title">RESTless Blogging</div>
        </Link>
        <ButtonsContainer>
          <Link to="/posts">Blog Posts</Link>
          <Link to="/login">Log In</Link>
        </ButtonsContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
