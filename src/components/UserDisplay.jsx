import { Icon } from '@iconify/react';
import { useAuthUser } from 'react-auth-kit';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const LogOut = styled.span`
  cursor: pointer;
  &:hover {
    color: var(--dark-hover);
  }
`;

const UserDisplay = ({ handleSignOut }) => {
  const user = useAuthUser();
  return (
    <>
      <Link to="/user">
        <UserInfo>
          <span>{user().username}</span>
          <Icon icon="ph:user-fill" />
        </UserInfo>
      </Link>
      <LogOut onClick={handleSignOut}>Log Out</LogOut>
    </>
  );
};

UserDisplay.propTypes = {
  handleSignOut: PropTypes.func
};

export default UserDisplay;
