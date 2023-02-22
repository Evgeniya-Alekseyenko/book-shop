import React from 'react';

import { MainContext } from './MainContext';

import dataBooks from '../assets/books.json';

export const MainContextProvider = (props) => {
    const { children } = props;
    const [books, setBooks] = React.useState([]);

    React.useEffect(() => {
        fetch(
            // `//63da5cca2af48a60a7cbb748.mockapi.io/books?${
            //     searchValue ? `&title=${searchValue}` : ''
            // }`
            '//63da5cca2af48a60a7cbb748.mockapi.io/books'
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((arr) => {
                setBooks(arr);
            })
            .catch(() => {
                if (!sessionStorage.getItem('knows_about_offline')) {
                    sessionStorage.setItem('knows_about_offline', false);
                }
                setBooks(dataBooks.books);
            });
    }, []);

    return (
        <MainContext.Provider value={{ books }}>
            {children}
        </MainContext.Provider>
    );
};
