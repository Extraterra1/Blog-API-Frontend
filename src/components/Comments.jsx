import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  /* margin-top: 0rem; */
`;

const Comments = ({ comments }) => {
  return (
    <>
      <hr style={{ margin: '10rem 0' }} />
      <Container>
        <div className="title">
          <h2>{comments.length === 0 ? 'No comments yet, be the first!' : comments.length === 1 ? '1 Comment' : `${comments.length} Comments`}</h2>
        </div>
      </Container>
    </>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object)
};

export default Comments;
