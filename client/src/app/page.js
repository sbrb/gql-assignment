'use client'
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

import UserIcons from '@/components/icons/UserIcons';
import { fetchAllUsers, followUser, unfollowUser } from '@/app/services/index';
import { getToken } from '@/utils/getToken';
import Navbar from '@/components/Navbar';
import { fetchUserDetails } from '@/redux/userSlice';


const Home = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const usersPerPage = 12;
  const pagesVisited = pageNumber * usersPerPage;
  const dispatch = useDispatch(); 
  const router = useRouter();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      loadUsers();
    }
  }, [token]);

  const loadUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data.allUsers);
      setLoading(false);
    } catch (error) {
      toast.error('Error loading users');
      setLoading(false);
    }
  };

  const handleFollow = async (treatedUserId) => {
    try {
      const response = await followUser(treatedUserId);
      if (response) {
        loadUsers();
        dispatch(fetchUserDetails());
        toast.success('Successfully followed');
      }
    } catch (error) {
      toast.error('Error following user');
    }
  };

  const handleUnfollow = async (treatedUserId) => {
    try {
      const response = await unfollowUser(treatedUserId);
      if (response) {
        loadUsers();
        dispatch(fetchUserDetails());
        toast.success('Successfully unfollowed');
      }
    } catch (error) {
      toast.error('Error unfollowing user');
    }
  };

  const pageCount = users ? Math.ceil(users.length / usersPerPage) : 0;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Navbar />
      <div className="user-card-container">
        {loading ? (
          Array.from({ length: usersPerPage }).map((_, index) => (
            <div key={index} className="user-card">
              <Skeleton height={220} width={220} />
              <div className="user-details">
                <div className='user-profile-icons'>
                  <UserIcons />
                </div>
                <p className='sc-user-dit'></p>
                <p className='sc-user-dit'></p>
                <button className="unfollow-button sc-lood-btn"></button>
              </div>
            </div>
          ))
        ) : (
          users.slice(pagesVisited, pagesVisited + usersPerPage).map((user, index) => (
            <div key={index} className="user-card">
              {user.profilePic ? (
                <div>
                  <img src={user.profilePic} className='user-image' alt='Profile Pic' />
                </div>
              ) : (
                <div className='user-profile-icons'>
                  <UserIcons />
                </div>
              )}
              <div className="user-details">
                <p><b>{user.firstName} {user.lastName}</b></p>
                <i>{user.userName}</i>
                <br />
                <br />
                {user.follow ? (
                  <button className="unfollow-button" onClick={() => handleUnfollow(user._id)}>Unfollow</button>
                ) : (
                  <button className="follow-button" onClick={() => handleFollow(user._id)}>Follow</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
      <ToastContainer position="top-left" />
    </>
  );
}

export default Home;
