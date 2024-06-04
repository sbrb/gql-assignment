'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import UserIcons from '@/components/icons/UserIcons';
import { fetchUserDetails } from '@/redux/userSlice';
import { getToken } from '@/utils/getToken';

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const status = useSelector((state) => state.user.status);
    const token = getToken();

    useEffect(() => {
        if (!token) {
            router.push('/login');
        } else if (status === 'idle' || !user) {
            dispatch(fetchUserDetails());
        }
    }, [dispatch, router, token, status, user]);

    const handleClick = () => {
        router.push('/profile');
    };

    const homePage = () => {
        router.push('/');
    };

    let followCount = user?.following.length||0;

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <b><h3 onClick={homePage}>HOME</h3></b>
            </div>

            <div className="navbar-profile">
                {user?.profilePic ? (
                    <div>
                        <img src={user?.profilePic} className='user-profile-pic' alt='Profile Pic' onClick={handleClick} />
                    </div>
                ) : (
                    <div className='user-profile-icons nav-user-profile-icons' onClick={handleClick}>
                        <UserIcons />
                    </div>
                )}

                {followCount > 0 && (
                    <h2 className='follow-count' onClick={handleClick}>{followCount}</h2>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
