import { Icon } from '@iconify/react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const UserDisplay = () => {
  const user = useAuthUser();
  return (
    <>
      <Link to="/user">
        <UserInfo>
          <span>{user.username}</span>
          <Icon icon="ph:user-fill" />
        </UserInfo>
      </Link>
      <LogOut>Log Out</LogOut>
    </>
  );
};

export default UserDisplay;
