import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';

import Header from './Header';
import Card from './Card';
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
  }
`;

const PostsContainer = styled.section`
  padding: 3rem 8rem;
`;

const PostsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;

  & h4 {
    font-size: 2rem;
    font-weight: 700;
  }

  & p {
    font-size: 1.3rem;
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
  const [{ data, loading, error }] = useAxios({
    url: 'https://project-blog-api.fly.dev/api/posts',
    method: 'GET'
  });

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

// const blogPosts = [
//   {
//     id: 1,
//     title: 'Embracing the Stateless Journey',
//     content:
//       'In this post, we explore the beauty of living without constraints, finding humor in every API call, and navigating the uncharted waters of the RESTless realm.',
//     author: 'LaughMaster2000'
//   },
//   {
//     id: 2,
//     title: 'Byte-sized Comedy: Unleashing Laughter in JSON',
//     content:
//       'Discover the art of crafting compact yet hilarious jokes in this post, as we delve into the world of byte-sized comedy, where every laugh is a precious payload.',
//     author: 'JokeSmith'
//   },
//   {
//     id: 3,
//     title: 'Breaking the Mold: Laughing Outside the Brackets',
//     content:
//       'Join us on a journey beyond the traditional boundaries of humor as we explore unconventional jokes, breaking free from the constraints of the ordinary and embracing the unexpected.',
//     author: 'WitExplorer'
//   },
//   {
//     id: 4,
//     title: 'API-tizing Chuckles: A Feast for the Funny Bone',
//     content:
//       "Get ready for a laughter banquet as we serve up API-tizing jokes that tickle your code-funny bone. It's a delightful fusion of wit, tech, and a dash of the unexpected!",
//     author: 'PunEngineer'
//   },
//   {
//     id: 5,
//     title: 'Witty Unplugged: Finding Humor in Stateless Moments',
//     content:
//       'In this post, we explore the uncharted territories of wit, where jokes flow freely and laughter knows no RESTraints. Join us in embracing the spontaneous and unplugged side of humor.',
//     author: 'HilarityNavigator'
//   }
// ];
