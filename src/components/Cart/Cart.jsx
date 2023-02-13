import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Cart.module.scss';
import CartEmpty from './CartEmpty';
import CartItem from './CartItem';

const Cart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    console.log(cart);

    const cartTotal = () => {
        if (cart) {
            let overall = 0;
            for (let item of cart) {
                overall += item.total;
            }
            return overall.toFixed(2);
        } else {
            <CartEmpty />;
        }
    };

    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/cart';

    const handleSubmit = () => {
        localStorage.removeItem('cart');
        navigate(fromPage, { replace: true });
    };

    return (
        <>
            <div className={styles.btn_container}>
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
                <div className={styles.amount}>Total amount: {cartTotal()}</div>
            </main>
        </>
    );
};

export default Cart;
