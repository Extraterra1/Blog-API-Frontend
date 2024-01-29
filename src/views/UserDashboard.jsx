import styled from 'styled-components';
import { useAuthUser } from 'react-auth-kit';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAxios from 'axios-hooks';
import { ClipLoader } from 'react-spinners';
import he from 'he';

import StyledModal from '../components/StyledModal';
import Header from '../components/Header';
import UpgradeUserForm from '../components/UpgradeUserForm';

// const blogPosts = [
//   { id: '65a0204afc91c61eb0f106de', title: 'The Future of Artificial Intelligence: Trends and Breakthroughs' },
//   { id: 2, title: "Demystifying Blockchain: How It's Reshaping Industries" },
//   { id: 3, title: 'Exploring the Quantum Frontier: Quantum Computing Unveiled' },
//   { id: 4, title: '5G Revolution: Transforming Connectivity and Beyond' },
//   { id: 5, title: 'The Rise of Edge Computing: Enhancing Speed and Efficiency' },
//   { id: 6, title: 'Cybersecurity in the Modern Age: Strategies for a Secure Digital World' },
//   { id: 7, title: 'Augmented Reality: Bridging the Gap Between Virtual and Real' },
//   { id: 8, title: 'The Evolution of Smart Homes: A Glimpse into the Connected Future' },
//   { id: 9, title: 'Understanding Open Source: Empowering Innovation in Tech' },
//   { id: 10, title: "Tech Trends 2024: What's Hot in the World of Gadgets and Gizmos" }
// ];

const UserDashboard = () => {
  const user = useAuthUser();
  const navigate = useNavigate();
  const [modal, setModal] = useState({ open: false, item: {} });
  const [{ data, loading, error }, refetch] = useAxios({ url: `${import.meta.env.VITE_API_URL}/users/${user().id}/posts` }, { useCache: false });

  const closeModal = () => setModal({ ...modal, open: false });

  return (
    <>
      <Header />
      <Main>
        <GridContainer>
          <div>
            <Box>
              <div className="title">
                <CircleLetter>{user().username.at(0).toUpperCase()}</CircleLetter>
                <span>{user().username}</span>
              </div>
              <UserInfo>
                <div>
                  <Icon icon="ph-envelope" />
                  <span>{user().email}</span>
                </div>
                <div>
                  <Icon icon="ph-user-list-fill" />
                  <span>{user().role}</span>
                </div>
                {user().role !== 'author' ? (
                  <div>
                    <UpgradeUserForm />
                  </div>
                ) : null}
              </UserInfo>
            </Box>
          </div>
          <div>
            <Box>
              <div className="title posts">
                <span>Submitted Posts</span>
                {user().role !== 'user' ? (
                  <Link to="/posts/create">
                    <CreatePostBtn>Add New</CreatePostBtn>
                  </Link>
                ) : null}
              </div>
              <ClipLoader loading={loading} size={100} cssOverride={{ margin: '3rem auto', display: 'block' }} color="var(--light)" />
              {error ? <h4>Something went wrong</h4> : null}
              {data && data.posts.length === 0 ? (
                <h4>Nothing to see here...</h4>
              ) : (
                <PostsContainer>
                  {data &&
                    data.posts.map((el) => {
                      return (
                        <div key={el._id}>
                          <Icon icon="ph:article-fill" />
                          <Link to={`/posts/${el._id}`}>{he.decode(el.title)}</Link>
                          <Icon
                            onClick={() => setModal({ open: true, item: { title: he.decode(el.title), id: el._id } })}
                            className="trash"
                            icon="ph:trash-fill"
                          />
                          <Icon onClick={() => navigate('/posts/edit', { state: { post: el } })} icon="ph:note-pencil-fill" />
                        </div>
                      );
                    })}
                </PostsContainer>
              )}
            </Box>
          </div>
        </GridContainer>
      </Main>
      <StyledModal isOpen={modal.open} item={modal.item} closeModal={closeModal} refetchPosts={refetch} />
    </>
  );
};

export default UserDashboard;

const Main = styled.main`
  background-color: #3e3e3e;
  color: var(--light);
  padding: 5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70rem, 1fr));

  gap: 5rem;

  @media (max-width: 750px) {
    grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  }
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
  & .title.posts {
    justify-content: space-between;
    padding: 0 2rem;
  }
  & h4 {
    font-size: 2rem;
    font-weight: 400;
    margin-top: 3rem;
    text-align: center;
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

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 5rem;
  font-size: 2.5rem;
  margin-left: 3rem;

  & div {
    display: flex;
    align-items: center;
    gap: 2rem;

    & svg {
      font-size: 5rem;
    }
    &:nth-child(2) span {
      text-transform: capitalize;
    }
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 5rem;
  font-size: 2rem;
  font-weight: 300;
  margin-left: 3rem;

  @media (max-width: 450px) {
    gap: 3rem;
  }

  & div {
    display: flex;
    gap: 2rem;
    align-items: center;

    @media (max-width: 450px) {
      display: grid;
      grid-template-columns: 1fr auto auto;
      gap: 1rem;
    }

    & svg:first-child {
      font-size: 5rem;
      @media (max-width: 450px) {
        display: none;
      }
    }
    & svg:not(:first-child) {
      cursor: pointer;
      font-size: 2.5rem;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
    & svg.trash:hover {
      color: var(--danger);
    }
    & a {
      transition: color 0.3s ease;
      flex-grow: 1;
    }
    & a:hover {
      font-weight: 400;
      color: #fff;
    }
  }
`;

const CreatePostBtn = styled.button`
  font-size: 2rem;
  background-color: var(--success);
  border: 1px solid var(--light);
  @media (max-width: 450px) {
    min-width: 12ch;
  }
`;
