import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import testImg from '../assets/heroBackground.jpg';

const images = [
  testImg,
  'https://img.freepik.com/free-photo/fuji-mountain-kawaguchiko-lake-sunset-autumn-seasons-fuji-mountain-yamanachi-japan_335224-1.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/97/39/7f/caption.jpg',
  'https://cdn.kimkim.com/files/a/content_articles/featured_photos/a7916f70f088c9761e559101657bd27ef61a232a/big-8c33ed7c9f6bb1060d25644eaedaba22.jpg',
  'https://www.usnews.com/object/image/00000161-00f5-deb3-a1eb-88f5bda10000/bc18.countries_japan_crop.jpg?',
  'https://ichef.bbci.co.uk/news/976/cpsprodpb/FCD4/production/_129042746_bbcm_japan_country_profile_200323.png'
];

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
    max-width: 40rem;
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
          <img src={images[Math.floor(Math.random() * 6)]} alt="" />
        </div>
        <div className="title">
          <Link to={`/posts/${post._id}`}>
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
