import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useIsAuthenticated } from 'react-auth-kit';

import CommentsBox from './CommentsBox';

const Container = styled.div`
  /* margin-top: 0rem; */
`;

const Comments = ({ comments }) => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <>
      <hr style={{ margin: '10rem 0' }} />
      <Container>
        <div className="title">
          <h2>{comments.length === 0 ? 'No comments yet, be the first!' : comments.length === 1 ? '1 Comment' : `${comments.length} Comments`}</h2>
        </div>
        {isAuthenticated() ? <CommentsBox /> : null}
      </Container>
    </>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object)
};

export default Comments;
