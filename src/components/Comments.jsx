import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useIsAuthenticated } from 'react-auth-kit';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import InsertCommentForm from './InsertCommentForm';
import Comment from './Comment';
import CommentModal from './CommentModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  & span {
    color: var(--info);
    text-decoration: underline;
    text-underline-offset: 0.5rem;
  }
`;

const Comments = ({ commentsArr }) => {
  const isAuthenticated = useIsAuthenticated();
  const [comments, setComments] = useState(commentsArr);
  const [modal, setModal] = useState({ open: false, comment: {} });
  const { pathname } = useLocation();

  const closeModal = () => setModal({ ...modal, open: false });

  return (
    <>
      <hr style={{ margin: '10rem 0' }} />
      <Container>
        <div className="title">
          <h2>{comments.length === 0 ? 'No comments yet, be the first!' : comments.length === 1 ? '1 Comment' : `${comments.length} Comments`}</h2>
        </div>
        {isAuthenticated() ? (
          <InsertCommentForm setComments={setComments} />
        ) : (
          <StyledLink to="/login" state={{ pathname }}>
            You need to be <span>logged in</span> to leave a comment.
          </StyledLink>
        )}
        {comments.map((e) => (
          <Comment key={e._id} comment={e} setModal={setModal} />
        ))}
      </Container>
      <CommentModal isOpen={modal.open} closeModal={closeModal} comment={modal.comment} setComments={setComments} />
    </>
  );
};

Comments.propTypes = {
  commentsArr: PropTypes.arrayOf(PropTypes.object)
};

export default Comments;
