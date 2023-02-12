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
                    <div>Book name: </div>
                    <div className={styles.cart_data}>{title}</div>
                </div>
                <div>
                    <div>
                        Book count:
                        <span className={styles.cart_data}>{count}</span>
                    </div>
                    <div>
                        Price for 1:
                        <span className={styles.cart_data}>{price} $</span>
                    </div>
                </div>
                <div>
                    <span>
                        Total price:
                        <span className={styles.cart_data}>{total}</span>
                    </span>
                </div>
            </div>
        </main>
    );
};

export default CartItem;
