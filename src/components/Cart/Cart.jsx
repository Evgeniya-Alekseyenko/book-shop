import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Cart.module.scss';
import CartEmpty from './CartEmpty';
import CartItem from './CartItem';

const Cart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/cart';

    const handleSubmit = () => {
        localStorage.removeItem('cart');
        navigate(fromPage, { replace: true });
    };

    return (
        <>
            <div>
                <button className={styles.btn} onClick={handleSubmit}>
                    Purchase
                </button>
            </div>
            <main>
                {cart ? (
                    cart.map((obj) => <CartItem key={obj.id} {...obj} />)
                ) : (
                    <CartEmpty />
                )}
            </main>
        </>
    );
};

export default Cart;
