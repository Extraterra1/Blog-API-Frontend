import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Icon } from '@iconify/react';
import { useIsAuthenticated, useAuthUser, useAuthHeader } from 'react-auth-kit';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from 'axios-hooks';

import CommentModal from './CommentModal';

const Comment = ({ comment, setComments }) => {
  const isAuthenticated = useIsAuthenticated();
  const user = useAuthUser();
  const authHeader = useAuthHeader();
  const [isLiked, setIsLiked] = useState(isAuthenticated() && comment.likes.includes(user().id));
  const [modal, setModal] = useState({ open: false, comment: {} });
  const [, sendLike] = useAxios(
    { url: `${import.meta.env.VITE_API_URL}/comments/${comment._id}/like`, headers: { Authorization: authHeader() } },
    { manual: true }
  );

  const closeModal = () => setModal({ ...modal, open: false });

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        await sendLike({ method: 'DELETE' });
      } else {
        await sendLike({ method: 'PATCH' });
      }
      setIsLiked(!isLiked);
    } catch (err) {
      toast.error('Something went wrong');
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <div className="header">
          <p>
            <strong>{comment.author.username} </strong>
            on {moment(comment.added).format('MMM D, YYYY')}
          </p>
          {isAuthenticated() ? (
            <div className="actions">
              <Icon onClick={handleLikeToggle} className="like-icon" icon={isLiked ? 'ph-heart-fill' : 'ph-heart'} color={isLiked ? 'var(--danger)' : null} />
              {isAuthenticated() && (user().id === comment.author._id || user().role === 'author') ? (
                <Icon onClick={() => setModal({ ...modal, open: true })} className="edit-icon" icon="ph:pencil" />
              ) : null}
            </div>
          ) : null}
        </div>
        <p className="content">{comment.content}</p>
      </Container>
      <CommentModal isOpen={modal.open} closeModal={closeModal} comment={modal.comment} setComments={setComments} />
    </>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  setComments: PropTypes.func
};

export default Comment;

const Container = styled.div`
  display: grid;
  border: 1px solid var(--dark);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  gap: 2rem;

  & .header {
    display: flex;
    justify-content: space-between;
  }

  & .actions {
    display: flex;
    gap: 2rem;

    & svg {
      cursor: pointer;
    }

    & .like-icon:hover {
      color: var(--danger);
    }
    & .edit-icon:hover {
      color: var(--info);
    }
  }

  & .content {
    margin-left: 2rem;
  }
`;
