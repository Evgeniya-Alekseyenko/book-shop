import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import { LocalStorageService, LS_KEYS } from '../services/LocalStorage';
import { BigHead } from '@bigheads/core';
import { getRandomOptions } from '../utils/bigheads';
import cartIcon from '../assets/images/cart.svg';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';
    const user = LocalStorageService.get(LS_KEYS.USERNAME);
    const cart = LocalStorageService.get(LS_KEYS.CART);

    const handleSubmit = () => {
        LocalStorageService.remove(LS_KEYS.USERNAME);
        LocalStorageService.remove(LS_KEYS.CART);
        sessionStorage.removeItem('knows_about_offline');
        navigate(fromPage, { replace: true });
    };

    return (
        <header>
            {user ? (
                <div className='header'>
                    <Link to='/booklist'>
                        <h1 className='header_link'>
                            X-course task / Alekseyenko Yevgeniya
                        </h1>
                    </Link>
                    <div className='header_right'>
                        <Link to='/cart'>
                            <div className='cart'>
                                <img src={cartIcon} alt='cart' width={50} />
                                <div className='circle'>
                                    {cart ? cart.length : 0}
                                </div>
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
