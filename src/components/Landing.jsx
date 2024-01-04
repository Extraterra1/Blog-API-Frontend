import styled from 'styled-components';

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

  & .title {
    background-color: rgba(33, 37, 41, 0.7);
    padding: 3rem 3rem;
    font-size: 5rem;
    color: var(--light);
    border-radius: 0.5rem;
  }
`;

const PostsGrid = styled.section`
  padding: 2rem 8rem;
  gap: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
`;

const Landing = () => {
  return (
    <>
      <Header />
      <Hero>
        <div className="title">No REST For The Wicked</div>
      </Hero>
      <PostsGrid>
        {blogPosts.map((e) => (
          <Card key={e.id} post={e} />
        ))}
      </PostsGrid>
    </>
  );
};

export default Landing;

const blogPosts = [
  {
    id: 1,
    title: 'Embracing the Stateless Journey',
    content:
      'In this post, we explore the beauty of living without constraints, finding humor in every API call, and navigating the uncharted waters of the RESTless realm.',
    author: 'LaughMaster2000'
  },
  {
    id: 2,
    title: 'Byte-sized Comedy: Unleashing Laughter in JSON',
    content:
      'Discover the art of crafting compact yet hilarious jokes in this post, as we delve into the world of byte-sized comedy, where every laugh is a precious payload.',
    author: 'JokeSmith'
  },
  {
    id: 3,
    title: 'Breaking the Mold: Laughing Outside the Brackets',
    content:
      'Join us on a journey beyond the traditional boundaries of humor as we explore unconventional jokes, breaking free from the constraints of the ordinary and embracing the unexpected.',
    author: 'WitExplorer'
  },
  {
    id: 4,
    title: 'API-tizing Chuckles: A Feast for the Funny Bone',
    content:
      "Get ready for a laughter banquet as we serve up API-tizing jokes that tickle your code-funny bone. It's a delightful fusion of wit, tech, and a dash of the unexpected!",
    author: 'PunEngineer'
  },
  {
    id: 5,
    title: 'Witty Unplugged: Finding Humor in Stateless Moments',
    content:
      'In this post, we explore the uncharted territories of wit, where jokes flow freely and laughter knows no RESTraints. Join us in embracing the spontaneous and unplugged side of humor.',
    author: 'HilarityNavigator'
  }
];
