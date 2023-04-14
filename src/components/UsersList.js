import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import useThunk from '../hooks/useThunk';
import { fetchUsers, addUser, removeUser } from '../store';
import UsersShimmer from './UsersShimmer';

const User = styled.div`
  display: flex;
  flex-direction: column;
  color: #333;
  font-size: 16px;
  line-height: 1.5;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #9fedb4;
  transition: background-color 0.2s ease-in-out;
  margin: 8px;

  &:hover {
    background-color: #3e83de;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const UserName = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 16px;
  cursor: pointer;
  border-radius: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px;
`;

const UsersList = () => {
  const [doFetchUsers, isLoadingUser, isErrorLoadingUser] = useThunk(fetchUsers);
  const [doCreateUser, isCreatingUsers, isCreatingUserError] = useThunk(addUser);
  const [doRemoveUser] = useThunk(removeUser);
  const {data} = useSelector((state) => state.users);

  useEffect(() => {
    doFetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (isLoadingUser) {
    return <UsersShimmer times={6} />
  }

  if (isErrorLoadingUser) {
    return <p>Error fetching data ...</p>
  }

  const handleAddUser = () => {
    doCreateUser();
  }

  const handleRemoveUser = (user) => {
    doRemoveUser(user);
  }

  return (
    <>
    <Wrapper>
      <h2>Users List</h2>
      {
        isCreatingUsers ? 'Creating user' :
        <Button onClick={handleAddUser}>+ Add User</Button>
      }
      {isCreatingUserError && "error in user creation"}
    </Wrapper>
    {
      data.map((user) => (
        <User key={user.id} onClick={() => handleRemoveUser(user)}>
          <UserInfo>
            <UserName>{user.name}</UserName>
          </UserInfo>
        </User>
      ))
    }
    </>
  )
}

export default UsersList
