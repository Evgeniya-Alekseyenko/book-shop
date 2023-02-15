import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CartEmpty from './CartEmpty';
import CartItem from './CartItem';

import styles from './Cart.module.scss';

const Cart = () => {
    const [cart, setCart] = React.useState();
    const [disBtn, setDisBtn] = React.useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/cart';

    const handleSubmit = () => {
        localStorage.removeItem('cart');
        navigate(fromPage, { replace: true });
        setCart(null);
    };

    React.useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')));
    }, []);

    React.useEffect(() => {
        setDisBtn(!cart);
    }, [cart]);

    function updateCart(id) {
        if (cart) {
            const newCart = cart.filter((cartItem) => cartItem.id !== id);
            localStorage.setItem('cart', JSON.stringify(newCart));
            newCart.length > 0
                ? setCart(newCart)
                : localStorage.removeItem('cart') || setCart(null);
        }
    }

    return (
        <>
            <div className={styles.btn_container}>
                <button
                    className={disBtn ? styles.btn_disabled : styles.btn}
                    onClick={handleSubmit}
                    disabled={disBtn}
                >
                    Purchase
                </button>
            </div>
            <main>
                {cart ? (
                    cart.map((obj) => (
                        <CartItem
                            key={obj.id}
                            {...obj}
                            onChangeCart={updateCart}
                        />
                    ))
                ) : (
                    <CartEmpty />
                )}
                {cart && (
                    <div className={styles.amount}>
                        Total amount:
                        {cart
                            .reduce(
                                (sum, cur) => sum + cur.price * cur.count,
                                0
                            )
                            .toFixed(2)}
                        $
                    </div>
                )}
            </main>
        </>
    );
};

export default Cart;
