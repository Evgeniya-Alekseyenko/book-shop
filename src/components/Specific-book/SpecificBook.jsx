import React from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

import { MainContext } from '../../context/MainContext';
import { useModal } from 'react-hooks-use-modal';

import styles from './SpecificBook.module.scss';

const SpecificBook = () => {
    const { books } = React.useContext(MainContext);
    const [book, setBook] = React.useState({});
    const [inputValue, setInputValue] = React.useState(1);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [inputError, setInputError] = React.useState('');
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false,
    });
    const [cartCount, setCartCount] = React.useState(
        parseInt(localStorage.getItem('cartCount')) || 0
    );

    React.useEffect(() => {
        const totalCount = (inputValue * book.price).toFixed(2);
        const specificBook = books?.find(
            (el) => parseInt(el.id) === parseInt(bookId)
        );
        if (specificBook) {
            setBook(specificBook);
        }
        if (book) {
            setTotalPrice(totalCount);
        }
        if (inputValue && inputValue > 0 && inputValue <= 42) {
            setTotalPrice((inputValue * book.price).toFixed(2));
            setInputError('');
        } else {
            setInputError('You can enter more than 1 and less than 42');
            setInputValue('');
        }
    }, [books, bookId, inputValue, book]);

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
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
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
            localStorage.setItem('cart', JSON.stringify(cart));
            const newCartCount = cartCount + inputValue;
            localStorage.setItem('cartCount', newCartCount);
            setCartCount(newCartCount);
        }
    };

    const getBookCount = (cart, bookId) => {
        return cart.reduce((count, cartItem) => {
            if (cartItem.id === bookId) {
                return count + cartItem.count;
            }
            return count;
        }, 0);
    };
    const count = getBookCount(
        JSON.parse(localStorage.getItem('cart') || '[]'),
        book.id
    );
    React.useEffect(() => {
        setCartCount(count);
    }, [count]);

    return (
        <section>
            <div className={styles.wrapper}>
                <div className={styles.wrapper__column}>
                    <img
                        className={styles.book_cover}
                        src={
                            book?.image ||
                            'https://via.placeholder.com/250x328.png?text=No+Image'
                        }
                        alt="book's foto"
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
                                <span className={styles.book_value} id='price'>
                                    {book.price}
                                </span>
                            </h3>
                        </div>
                        <div>
                            {inputError && (
                                <div style={{ color: 'red' }}>{inputError}</div>
                            )}
                            <label className={styles.count}>Count: </label>
                            <input
                                value={inputValue}
                                onChange={(e) =>
                                    setInputValue(Math.round(e.target.value))
                                }
                                type='number'
                                name='count'
                                className={styles.input_count}
                            />
                        </div>
                        <div className={styles.count}>
                            Total price:
                            <span className={styles.book_value} id='totalPrice'>
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
                                className={styles.btn}
                                onClick={onAddToCart}
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
        </section>
    );
};

export default SpecificBook;
