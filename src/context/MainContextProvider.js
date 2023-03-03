import React, { useEffect, useState, useCallback } from 'react';

import { MainContext } from './MainContext';

import dataBooks from '../assets/books.json';

const fetchData = async () => {
    try {
        const response = await fetch(
            '//63da5cca2af48a60a7cbb748.mockapi.io/books'
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const handleFetchError = () => {
    if (!sessionStorage.getItem('knows_about_offline')) {
        sessionStorage.setItem('knows_about_offline', false);
    }
    return dataBooks.books;
};

export const MainContextProvider = (props) => {
    const { children } = props;
    const [books, setBooks] = useState([]);

    const fetchBooks = useCallback(async () => {
        const data = await fetchData();
        setBooks(data.length > 0 ? data : handleFetchError());
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <MainContext.Provider value={{ books }}>
            {children}
        </MainContext.Provider>
    );
};
