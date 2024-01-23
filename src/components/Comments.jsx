import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useIsAuthenticated } from 'react-auth-kit';
import { useState } from 'react';

import CommentsBox from './CommentsBox';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Comments = ({ commentsArr }) => {
  const isAuthenticated = useIsAuthenticated();
  const [comments, setComments] = useState(commentsArr);
  return (
    <>
      <hr style={{ margin: '10rem 0' }} />
      <Container>
        <div className="title">
          <h2>{comments.length === 0 ? 'No comments yet, be the first!' : comments.length === 1 ? '1 Comment' : `${comments.length} Comments`}</h2>
        </div>
        {isAuthenticated() ? <CommentsBox setComments={setComments} /> : null}
        {comments.map((e) => (
          <p key={e._id}>{e.content}</p>
        ))}
      </Container>
    </>
  );
};

Comments.propTypes = {
  commentsArr: PropTypes.arrayOf(PropTypes.object)
};

export default Comments;
