import styled from 'styled-components';
import { useAuthUser } from 'react-auth-kit';

import Header from '../components/Header';

const Main = styled.main`
  background-color: #3e3e3e;
  color: var(--light);
  padding: 5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70rem, 1fr));
  gap: 5rem;
`;

const Box = styled.div`
  background-color: var(--cyan);
  border-radius: 0.5rem;
  padding: 2rem;
  & .title {
    font-size: 3rem;
    display: flex;
    gap: 3rem;
    align-items: center;
  }
`;

const CircleLetter = styled.span`
  display: grid;
  place-items: center;
  aspect-ratio: 1/1;
  font-size: 5rem;
  border-radius: 50%;
  background-color: var(--dark);
  min-width: 3ch;

  font-family: Arial;
`;

const UserDashboard = () => {
  const user = useAuthUser();
  return (
    <>
      <Header />
      <Main>
        <GridContainer>
          <Box>
            <div className="title">
              <CircleLetter>{user().username.at(0).toUpperCase()}</CircleLetter>
              <span>{user().username}</span>
            </div>
          </Box>
          <Box>
            <div className="title">Submitted Blog Posts</div>
          </Box>
        </GridContainer>
      </Main>
    </>
  );
};

export default UserDashboard;
