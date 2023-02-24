import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import CartEmpty from './CartEmpty';
import CartItem from './CartItem';
import BackButton from '../BackButton';
import Loader from '../Loader';

import styles from './Cart.module.scss';

const Cart = () => {
    const [cart, setCart] = React.useState();
    const [disBtn, setDisBtn] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/cart';

    const handleSubmit = () => {
        localStorage.removeItem('cart');
        localStorage.removeItem('cartCount');
        navigate(fromPage, { replace: true });
        setCart(null);
    };

    React.useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')));
        // setIsLoading(false);
        setTimeout(() => setIsLoading(false), 500);
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
        localStorage.removeItem('cartCount');
        navigate(fromPage);
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    {cart ? (
                        <div>
                            <BackButton />
                        </div>
                    ) : null}
                    <div className={styles.btn_container}>
                        <button
                            className={
                                disBtn ? styles.btn_disabled : styles.btn
                            }
                            onClick={handleSubmit}
                            disabled={disBtn}
                        >
                            Purchase
                        </button>
                    </div>
                    {cart && (
                        <main>
                            {cart.map((obj) => (
                                <CartItem
                                    key={obj.id}
                                    {...obj}
                                    onChangeCart={updateCart}
                                />
                            ))}
                            <div className={styles.amount}>
                                <span>Total amount: </span>
                                {cart
                                    .reduce(
                                        (sum, cur) =>
                                            sum + cur.price * cur.count,
                                        0
                                    )
                                    .toFixed(2)}
                                $
                                <Link to='/booklist'>
                                    <div>
                                        <button
                                            type='submit'
                                            className={styles.btn}
                                        >
                                            Back to books
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </main>
                    )}
                    {!cart && <CartEmpty />}
                </div>
            )}
        </>
    );
};

export default Cart;
