import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  padding: 2rem 4rem;
  justify-content: space-between;
  font-size: 1.5rem;
  align-items: center;
  & .title {
    font-size: 3rem;
    font-weight: 700;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-right: 4rem;
`;

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <div className="title">RESTless Blogging</div>
        <ButtonsContainer>
          <Link to="/posts">Blog Posts</Link>
          <Link to="/login">Log In</Link>
        </ButtonsContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
