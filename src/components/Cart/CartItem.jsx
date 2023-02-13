import React from 'react';

import styles from './Cart.module.scss';

const CartItem = ({ image, price, title, count, total }) => {
    return (
        <main>
            <div className={styles.cart_container}>
                <div>
                    <img
                        src={
                            image
                                ? image
                                : 'https://via.placeholder.com/250x328.png?text=No+Image'
                        }
                        alt='book cover'
                        height={100}
                    />
                </div>
                <div>
                    <div className={styles.cart_title}>Book name: </div>
                    <div className={styles.cart_data}>{title}</div>
                </div>
                <div>
                    <div>
                        <span className={styles.cart_title}>Book count:</span>
                        <span className={styles.cart_data}>{count}</span>
                    </div>
                    <div>
                        <span className={styles.cart_title}>Price for 1:</span>
                        <span className={styles.cart_data}>{price} $</span>
                    </div>
                </div>
                <div>
                    <span className={styles.cart_title}>Total price: </span>
                    <span className={styles.cart_data}>{total}</span>
                </div>
            </div>
        </main>
    );
};

export default CartItem;
