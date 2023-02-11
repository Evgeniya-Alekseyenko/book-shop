import React from 'react';
import { Link } from 'react-router-dom';

import cart from '../../assets/images/cart.svg';

import styles from './Cart.module.scss';

const CartEmpty = () => {
    return (
        <main className={styles.cart_container}>
            <img src={cart} alt='cart' width={250} />
            <h1>Cart is empty...</h1>
            <Link to='/booklist'>
                <div className={styles.btn}>Return</div>
            </Link>
        </main>
    );
};

export default CartEmpty;
