import styled from 'styled-components';

import Header from './Header';
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

const Landing = () => {
  return (
    <>
      <Header />
      <Hero>
        <div className="title">No REST For The Wicked</div>
      </Hero>
    </>
  );
};

export default Landing;
