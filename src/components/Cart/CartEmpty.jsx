import React from 'react';
import { Link } from 'react-router-dom';

import cart from '../../assets/images/cart.svg';

import styles from './Cart.module.scss';

const CartEmpty = () => {
    return (
        <main>
            <div className={styles.cartEmptyBox}>
                <img src={cart} alt='cart' width={250} />
                <h1>Cart is empty...</h1>
                <Link to='/booklist'>
                    <div className={styles.back_btn}>Return</div>
                </Link>
            </div>
        </main>
    );
};

export default CartEmpty;
