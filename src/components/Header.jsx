import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { BigHead } from '@bigheads/core';

import { getRandomOptions } from '../utils/bigheads';
import cart from '../assets/images/cart.svg';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

    const fromPage = location.state?.from?.pathname || '/';

    const handleSubmit = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        navigate(fromPage, { replace: true });
    };

    return (
        <header>
            {user ? (
                <div className='header'>
                    <Link to='/booklist'>
                        <h1>X-course task / Alekseyenko Yevgeniya</h1>
                    </Link>
                    <div className='header_left'>
                        <Link to='/cart'>
                            <div>
                                <img src={cart} alt='cart' width={50} />
                            </div>
                        </Link>
                        <div>
                            <button
                                type='submit'
                                className='btn'
                                onClick={handleSubmit}
                            >
                                Sign-Out
                            </button>
                        </div>
                        <div className='userInfo'>
                            <div style={{ width: '100px' }}>
                                <BigHead {...getRandomOptions()} />
                            </div>
                            <span>{user}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='header'>
                    <Link to='/booklist'>
                        <h1>X-course task / Alekseyenko Yevgeniya</h1>
                    </Link>
                </div>
            )}
        </header>
    );
}
export default Header;
