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

const PostContainer = styled.div`
  margin: 0 auto;
  max-width: 110ch;
  font-size: 2rem;
  font-weight: 300;

  & h1.title {
    margin: 10rem 0;
    font-size: 5rem;
    text-align: center;
  }

  & div:nth-child(2) {
    margin: 5rem 0;
  }
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

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
        {data ? (
          <PostContainer>
            <h1 className="title">{data.post.title}</h1>
            <InfoContainer>
              <p>
                Written by: <span>{data.post.author.username}</span>
              </p>
              <span>{data.post.added}</span>
            </InfoContainer>
            {data.post.content}
          </PostContainer>
        ) : null}
      </StyledMain>
    </>
  );
};

export default PostView;
