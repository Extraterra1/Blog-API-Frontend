import styled from 'styled-components';
import { useAuthUser } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';

import Header from '../components/Header';
import PostForm from '../components/PostForm';

const Main = styled.main`
  background-color: #e3e3e3;
`;

const CreatePost = () => {
  const user = useAuthUser();

  return (
    <>
      {user().role === 'user' ? <Navigate to="/user" /> : null}
      <Header />
      <Main>
        <PostForm />
      </Main>
    </>
  );
};

export default CreatePost;
