import React from 'react';
import { Link } from 'react-router-dom';

import { useLocation, useNavigate } from 'react-router-dom';

import cart from '../assets/images/cart.svg';
import avatar from '../assets/images/avatar.png';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

    const fromPage = location.state?.from?.pathname || '/';

    const handleSubmit = () => {
        localStorage.removeItem('user');
        // navigate('/');
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
                        <div>
                            <img src={cart} alt='cart' width={50} />
                        </div>
                        <div className='userInfo'>
                            <img src={avatar} alt='avatar' width={50} />
                            <span>{user}</span>
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='btn'
                                onClick={handleSubmit}
                            >
                                Sign-Out
                            </button>
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
