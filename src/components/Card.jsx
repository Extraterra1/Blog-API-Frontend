import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import testImg from '../assets/heroBackground.jpg';

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  width: 100%;
  border-radius: 0.5rem;
  color: #3e3e3e;

  & > .content {
    display: grid;
    grid-template-rows: 40rem auto auto;
    height: 100%;
    gap: 2rem;
    align-items: center;
  }

  & > .content > .img {
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    border-radius: 1rem;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & > .content > .title {
    margin-top: 2rem;
    font-size: 1.7rem;
    text-align: center;
    & h2 {
      font-weight: 500;
    }
  }

  & > .content > .desc {
    font-size: 1.4rem;
    margin-top: 1rem;
    max-width: 90ch;
    display: flex;
    align-items: center;
    &:first-letter {
      text-transform: uppercase;
    }
  }
`;

const Card = ({ post }) => {
  return (
    <CardContainer>
      <div className="content">
        <div className="img">
          <img src={testImg} alt="" />
        </div>
        <div className="title">
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
        </div>
        <div className="desc">
          <p>{post.content}</p>
        </div>
      </div>
    </CardContainer>
  );
};

Card.propTypes = {
  post: PropTypes.object
};

export default Card;
