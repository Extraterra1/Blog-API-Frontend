import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Icon } from '@iconify/react';
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit';

const Comment = ({ comment }) => {
  const isAuthenticated = useIsAuthenticated();
  const user = useAuthUser();

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
              <Icon
                className="like-icon"
                icon={comment.likes.includes(user().id) ? 'ph-heart-fill' : 'ph-heart'}
                color={comment.likes.includes(user().id) ? 'var(--danger)' : null}
              />
              <Icon className="edit-icon" icon="ph:pencil" />
            </div>
          ) : null}
        </div>
        <p className="content">{comment.content}</p>
      </Container>
    </>
  );
};

Comment.propTypes = {
  comment: PropTypes.object
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
