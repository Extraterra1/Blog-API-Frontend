import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';

import Header from '../components/Header';
import Card from '../components/Card';
import heroBg from '../assets/heroBackground.jpg';

const Hero = styled.section`
  height: 50vh;
  background-image: url(${heroBg});
  background-size: cover;
  background-position: center;
  display: grid;
  place-items: center;
  font-family: 'Rubik Doodle Shadow';
  & .title {
    background-color: rgba(33, 37, 41, 0.7);
    padding: 3rem 3rem;
    font-size: 5rem;
    color: var(--light);
    border-radius: 0.5rem;
    @media (max-width: 450px) {
      text-align: center;
    }
  }
`;

const PostsContainer = styled.section`
  padding: 3rem 8rem;
  @media (max-width: 450px) {
    padding: 3rem;
  }
`;

const PostsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;

  & h4 {
    font-size: 4rem;
    font-weight: 700;
  }

  & p {
    font-size: 2rem;
    font-weight: 400;
  }
`;

const ErrorMessage = styled.h4`
  font-size: 2rem;
  text-align: center;
`;

const PostsGrid = styled.div`
  font-family: 'Playfair Display';
  gap: 5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
`;

const Landing = () => {
  const [{ data, loading, error }] = useAxios(
    {
      url: `${import.meta.env.VITE_API_URL}/posts`,
      method: 'GET',
      timeout: 10000
    },
    { useCache: false }
  );

  if (error) toast.error('Something went wrong while fetching blog posts');

  return (
    <>
      <Header />
      <main>
        <Hero>
          <div className="title">No REST For The Wicked</div>
        </Hero>
        <PostsContainer>
          <PostsHeader>
            <h4>Blog Posts</h4>
            <p>Take a look at our original and totally not AI generated blog posts.</p>
          </PostsHeader>
          <ClipLoader loading={loading} size={100} cssOverride={{ margin: '3rem auto', display: 'block' }} />
          <PostsGrid>{data && data.posts.map((e) => <Card key={e._id} post={e} />)}</PostsGrid>
          {!data && !loading && <ErrorMessage>Nothing to see here...</ErrorMessage>}
        </PostsContainer>
      </main>
    </>
  );
};

export default Landing;
