import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

import { LocalStorageService } from '../../services/LocalStorage';
import { MainContext } from '../../context/MainContext';
import { useModal } from 'react-hooks-use-modal';
import Loader from '../Loader';

import styles from './SpecificBook.module.scss';

const SpecificBook = () => {
    const { books } = useContext(MainContext);
    const [book, setBook] = useState({});
    const [inputValue, setInputValue] = useState(1);
    const [totalPrice, setTotalPrice] = useState(null);
    const [inputError, setInputError] = useState('');
    const [disBtn, setDisBtn] = useState(false);
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false,
    });

    const [cartCount, setCartCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getBookCount = (cart, bookId) => {
        return cart.reduce((count, cartItem) => {
            if (cartItem.id === bookId) {
                return count + cartItem.count;
            }
            return count;
        }, 0);
    };

    const count = getBookCount(LocalStorageService.getUserCart(), book.id);

    useEffect(() => {
        if (book.price) {
            setTotalPrice((inputValue * book.price).toFixed(2));
            setIsLoading(false);
        }
        // eslint-disable-next-line
    }, [book]);

    useEffect(() => {
        if (isNaN(inputValue)) {
            setInputValue('');
        } else {
            if (parseInt(inputValue) > 0 && parseInt(inputValue) <= 42) {
                setTotalPrice((inputValue * book.price).toFixed(2));
                setInputError('');
                setDisBtn(false);
            } else {
                if (parseInt(inputValue) > 42) {
                    setInputValue(42);
                    setDisBtn(true);
                }
                if (parseInt(inputValue) < 1) {
                    setInputValue('');
                    setDisBtn(true);
                }
                setInputError('You can enter more than 1 and less than 42');
            }
        }
        // eslint-disable-next-line
    }, [inputValue]);

    useEffect(() => {
        const specificBook = books?.find(
            (el) => parseInt(el.id) === parseInt(bookId)
        );
        if (specificBook) {
            setBook(specificBook);
            setTotalPrice((inputValue * specificBook.price).toFixed(2));
            setIsLoading(false);
        }

        // eslint-disable-next-line
    }, [books, bookId]);

    const createCartItem = (book, count) => ({
        id: book.id,
        image: book.image,
        title: book.title,
        price: book.price,
        count: inputValue,
        total: Math.round(count * book.price * 100) / 100,
    });

    const onAddToCart = () => {
        if (inputValue) {
            const cart = LocalStorageService.getUserCart();

            const matchingCartItem = cart.find((item) => item.id === book.id);
            if (matchingCartItem) {
                matchingCartItem.image = book.image;
                matchingCartItem.title = book.title;
                matchingCartItem.price = book.price;
                matchingCartItem.count += inputValue;
                matchingCartItem.total =
                    Math.round(matchingCartItem.count * book.price * 100) / 100;
            } else {
                const cartBook = createCartItem(book, inputValue);
                cart.push(cartBook);
                navigate('/cart');
            }
            LocalStorageService.setUserCart(cart);
            const newCartCount = cartCount + inputValue;
            setCartCount(newCartCount);
        }
    };

    const decrement = () => {
        setInputValue(parseInt(inputValue - 1));
    };
    const increment = () => {
        setInputValue(parseInt(inputValue + 1));
    };

    return (
        <main>
            {isLoading && <Loader />}
            <div className={styles.wrapper}>
                <div className={styles.wrapper__column}>
                    <img
                        className={styles.book_cover}
                        src={
                            book?.image ||
                            'https://via.placeholder.com/250x328.png?text=No+Image'
                        }
                        alt={book.title}
                    />
                </div>
                <div className={styles.wrapper__column}>
                    <h2>
                        Book name:
                        <span className={styles.book_value}>{book.title}</span>
                    </h2>
                    <h2>
                        Book author:
                        <span className={styles.book_value}>{book.author}</span>
                    </h2>
                    <p className={styles.short_desc}>
                        <span className={styles.tags}>Short description:</span>
                        {book.shortDescription}
                    </p>
                </div>
                <div className={styles.wrapper__column}>
                    <div className={styles.column_price}>
                        <div>
                            <h3 className={styles.count}>
                                Price:
                                <span
                                    className={styles.book_value}
                                    id='price'
                                    data-testid='price'
                                >
                                    {book.price}
                                </span>
                            </h3>
                        </div>
                        <div>
                            {inputError && (
                                <div
                                    style={{ color: 'red' }}
                                    data-testid='error'
                                >
                                    {inputError}
                                </div>
                            )}
                            <label
                                htmlFor='countInput'
                                className={styles.count}
                            >
                                Count:
                            </label>
                            <div>
                                <button
                                    onClick={decrement}
                                    data-testid='decrement'
                                    disabled={inputValue < 1}
                                    className={
                                        inputValue <= 1
                                            ? styles.btn_disabled
                                            : `${styles.btn} ${styles.btn_input}`
                                    }
                                >
                                    -
                                </button>
                                <input
                                    data-testid='number-input'
                                    id='countInput'
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(
                                            Math.round(e.target.value)
                                        );
                                        e.target.value = inputValue;
                                    }}
                                    type='number'
                                    name='count'
                                    className={styles.input_count}
                                />
                                <button
                                    onClick={increment}
                                    data-testid='increment'
                                    disabled={inputValue >= 42}
                                    className={
                                        inputValue >= 42
                                            ? styles.btn_disabled
                                            : `${styles.btn} ${styles.btn_input}`
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className={styles.count}>
                            Total price:
                            <span
                                className={styles.book_value}
                                id='totalPrice'
                                data-testid='totalPrice'
                            >
                                {totalPrice}
                            </span>
                        </div>
                        <div className={styles.count}>
                            Already in cart:
                            <span className={styles.book_value} id='totalPrice'>
                                {count}
                            </span>
                        </div>
                        <div className={styles.btn_box}>
                            <button
                                type='submit'
                                className={
                                    disBtn
                                        ? styles.btn_disabledCart
                                        : styles.btn
                                }
                                onClick={onAddToCart}
                                disabled={disBtn}
                            >
                                Add to cart
                            </button>
                        </div>
                        <Link to='/booklist'>
                            <div>
                                <button type='submit' className={styles.btn}>
                                    Back to books
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.description_book}>
                <div className={styles.description}>
                    {isOpen
                        ? 'Read more about the book'
                        : 'More about the book'}
                </div>
                ▶
                <button onClick={open} className={styles.btn}>
                    OPEN
                </button>
                <Modal>
                    <div className={styles.modal}>
                        <h1>{book.title}</h1>
                        <p>{book.description}</p>
                        <div>
                            <button onClick={close} className={styles.btn}>
                                CLOSE
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </main>
    );
};

export default SpecificBook;
