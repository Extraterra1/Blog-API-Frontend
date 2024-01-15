import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import useAxios from 'axios-hooks';

import Header from '../components/Header';

const validatePostId = (value) => {
  const regex = /^[a-fA-F0-9]{24}$/;

  if (value !== '' && typeof value === 'string') {
    const result = value.match(regex);
    return result?.length > 0;
  }
  return false;
};

const StyledMain = styled.main`
  font-size: 1.5rem;
  display: grid;
  background-color: #e3e3e3;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  align-self: center;
  & svg {
    font-size: 10rem;
    color: var(--danger);
  }
  & p {
    font-size: 3rem;
  }
`;

const GoBackBtn = styled.button`
  background-color: var(--info);
`;

const PostView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [{ data, loading, error }] = useAxios({ url: `${import.meta.env.VITE_API_URL}/posts/${params.id}`, method: 'GET' });

  useEffect(() => {
    if (!validatePostId(params.id)) return navigate('/');
  });

  return (
    <>
      <Header />
      <StyledMain>
        <ClipLoader loading={loading} size={100} cssOverride={{ margin: '3rem auto', display: 'block', alignSelf: 'center' }} color="var(--dark)" />
        {error ? (
          <ErrorContainer>
            <Icon icon="ph:x-circle-fill" />
            <p>{error.response ? 'Post not Found' : 'Something Went Wrong'}</p>
            <GoBackBtn onClick={() => navigate(-1)}>Go Back</GoBackBtn>
          </ErrorContainer>
        ) : null}
      </StyledMain>
    </>
  );
};

export default PostView;
