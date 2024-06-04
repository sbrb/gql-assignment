'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import { fetchUserDetails } from '@/redux/userSlice';
import { getToken } from '@/utils/getToken';
import { clearCookies } from '@/utils/clearCookies';
import UserIcons from '@/components/icons/UserIcons';
import Navbar from '@/components/Navbar';

const UserProfile = () => {
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const status = useSelector((state) => state.user?.status);
  const router = useRouter();
  const token = getToken();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else if (status === 'idle' || !user) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, router, token, status, user]);

  const handleLogOut = () => {
    clearCookies();
    router.push('/login');
  };

  const handleClose = () => {
    router.push('/');
  };

  if (!isMounted) {
    return null;
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error fetching user details.</div>;
  }

  return (
    <>
      <Navbar />
      <div className='h-screen-center'>
        <div className='user-profile'>
          <span className='pro-close' onClick={handleClose}>X</span>
          {user?.profilePic ? (
            <div>
              <img src={user?.profilePic} className='user-profile-pic' alt='Profile Pic' />
            </div>
          ) : (
            <div className='user-profile-icons'>
              <UserIcons />
            </div>
          )}
          <div>
            <div className='user-full-details'>
              <div className='user-details'>
                <h3>{user?.firstName} {user?.lastName}</h3>
                <p>{user?.userName}</p>
                <p><mark><b>Following:</b> {user?.following?.length}</mark></p>
                <p>{user?.email}</p>
              </div>
              <button className='logout-button' onClick={handleLogOut}>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
