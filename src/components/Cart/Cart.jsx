import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { LocalStorageService, LS_KEYS } from '../../services/LocalStorage';
import CartEmpty from './CartEmpty';
import CartItem from './CartItem';
import BackButton from '../BackButton';
import Loader from '../Loader';

import styles from './Cart.module.scss';

const Cart = () => {
    const [cart, setCart] = useState();
    const [disBtn, setDisBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/cart';

    const handleSubmit = () => {
        LocalStorageService.remove(LS_KEYS.CART);
        LocalStorageService.remove(LS_KEYS.CARTCOUNT);
        navigate(fromPage, { replace: true });
        setCart(null);
    };

    useEffect(() => {
        setCart(LocalStorageService.get(LS_KEYS.CART));
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setDisBtn(!cart);
    }, [cart]);

    function updateCart(id) {
        if (cart) {
            const newCart = cart.filter((cartItem) => cartItem.id !== id);
            LocalStorageService.set(LS_KEYS.CART, newCart);
            newCart.length > 0
                ? setCart(newCart)
                : LocalStorageService.remove(LS_KEYS.CART) || setCart(null);
        }
        LocalStorageService.remove(LS_KEYS.CARTCOUNT);

        navigate(fromPage);
    }
    return (
        <main>
            {isLoading && <Loader />}
            {cart ? (
                <div>
                    <BackButton />
                </div>
            ) : null}
            <div className={styles.btn_container}>
                <button
                    className={disBtn ? styles.btn_disabled : styles.btn}
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
                                (sum, cur) => sum + cur.price * cur.count,
                                0
                            )
                            .toFixed(2)}
                        $
                        <Link to='/booklist'>
                            <div>
                                <button type='submit' className={styles.btn}>
                                    Back to books
                                </button>
                            </div>
                        </Link>
                    </div>
                </main>
            )}
            {!cart && <CartEmpty />}
        </main>
    );
};

export default Cart;
