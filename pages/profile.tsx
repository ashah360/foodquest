import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { getUserData, UserResponse } from '../services/user';

const Profile: NextPage = () => {
  const [user, setUser] = useState<UserResponse>();

  useEffect(() => {
    getUserData()
      .then(({ data: user }) => {
        setUser(user);
      })
      .catch((e) => {});
  }, []);

  return <div>{JSON.stringify(user)}</div>;
};

export default Profile;
