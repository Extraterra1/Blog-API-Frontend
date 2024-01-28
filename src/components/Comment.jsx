import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Icon } from '@iconify/react';
import { useIsAuthenticated, useAuthUser, useAuthHeader } from 'react-auth-kit';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from 'axios-hooks';
import he from 'he';

const Comment = ({ comment, setModal }) => {
  const isAuthenticated = useIsAuthenticated();
  const user = useAuthUser();
  const authHeader = useAuthHeader();
  const [isLiked, setIsLiked] = useState(isAuthenticated() && comment.likes.includes(user().id));
  const [, sendLike] = useAxios(
    { url: `${import.meta.env.VITE_API_URL}/comments/${comment._id}/like`, headers: { Authorization: authHeader() } },
    { manual: true }
  );

  const handleLikeToggle = async () => {
    try {
      if (!isAuthenticated()) return toast.error('You need to be logged in to leave a like!');
      if (isLiked) {
        await sendLike({ method: 'DELETE' });
        comment.likes = comment.likes.filter((e) => e !== user().id);
      } else {
        await sendLike({ method: 'PATCH' });
        comment.likes.push(user().id);
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

          <div className="actions">
            <div className="likes">
              <span>{comment.likes.length || null}</span>
              <Icon onClick={handleLikeToggle} className="like-icon" icon={isLiked ? 'ph-heart-fill' : 'ph-heart'} color={isLiked ? 'var(--danger)' : null} />
            </div>
            {isAuthenticated() && (user().id === comment.author._id || user().role === 'author') ? (
              <Icon onClick={() => setModal({ open: true, comment })} className="edit-icon" icon="ph:pencil" />
            ) : null}
          </div>
        </div>
        <p className="content">{he.decode(comment.content)}</p>
      </Container>
    </>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  setModal: PropTypes.func
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
    align-items: center;

    & > .likes {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

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
