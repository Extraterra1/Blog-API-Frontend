import styled from 'styled-components';
import { useAuthUser } from 'react-auth-kit';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import StyledModal from '../components/StyledModal';

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

  & div {
    display: flex;
    gap: 2rem;
    align-items: center;

    & svg:first-child {
      font-size: 5rem;
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
`;

// TODO: Fetch blog posts
const blogPosts = [
  { id: 1, title: 'The Future of Artificial Intelligence: Trends and Breakthroughs' },
  { id: 2, title: "Demystifying Blockchain: How It's Reshaping Industries" },
  { id: 3, title: 'Exploring the Quantum Frontier: Quantum Computing Unveiled' },
  { id: 4, title: '5G Revolution: Transforming Connectivity and Beyond' },
  { id: 5, title: 'The Rise of Edge Computing: Enhancing Speed and Efficiency' },
  { id: 6, title: 'Cybersecurity in the Modern Age: Strategies for a Secure Digital World' },
  { id: 7, title: 'Augmented Reality: Bridging the Gap Between Virtual and Real' },
  { id: 8, title: 'The Evolution of Smart Homes: A Glimpse into the Connected Future' },
  { id: 9, title: 'Understanding Open Source: Empowering Innovation in Tech' },
  { id: 10, title: "Tech Trends 2024: What's Hot in the World of Gadgets and Gizmos" }
];

const UserDashboard = () => {
  const user = useAuthUser();
  const [modal, setModal] = useState({ open: false, item: {} });

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
              </UserInfo>
            </Box>
          </div>
          <div>
            <Box>
              <div className="title posts">
                <span>Submitted Blog Posts</span>
                <CreatePostBtn>Add New</CreatePostBtn>
              </div>
              {user().role === 'user' ? (
                <h4>You are not an authorized author.</h4>
              ) : (
                <PostsContainer>
                  {blogPosts.map((el) => {
                    return (
                      <div key={el.id}>
                        <Icon icon="ph:article-fill" />
                        <Link to="/">{el.title}</Link>
                        <Icon onClick={() => setModal({ open: true, item: { title: el.title, id: el.id } })} className="trash" icon="ph:trash-fill" />
                        <Icon icon="ph:note-pencil-fill" />
                      </div>
                    );
                  })}
                </PostsContainer>
              )}
            </Box>
          </div>
        </GridContainer>
      </Main>
      <StyledModal isOpen={modal.open} item={modal.item} closeModal={closeModal} />
    </>
  );
};

export default UserDashboard;
