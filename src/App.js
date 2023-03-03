import React from 'react';
import { Route, Routes } from 'react-router';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Signin from './components/Signin/Signin.jsx';
import SpecificBook from './components/Specific-book/SpecificBook.jsx';
import Booklist from './components/Book-list/Booklist.jsx';
import NotFoundBlock from './components/NotFoundPage/NotFoundPage.jsx';
import Cart from './components/Cart/Cart.jsx';

import { LocalStorageService, LS_KEYS } from './services/LocalStorage.js';
import { RequireAuth } from './hooks/RequireAuth.jsx';
import { MainContextProvider } from './context/MainContextProvider';

import './scss/app.scss';

const user = LocalStorageService.get(LS_KEYS.USERNAME);

function App() {
    return (
        <div className='wrapper'>
            <MainContextProvider>
                <Header />
                <Routes>
                    <Route path='/' element={<Signin />} />
                    <Route
                        path='/booklist'
                        element={
                            <RequireAuth>
                                <Booklist />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/booklist/book/:bookId'
                        element={
                            <RequireAuth>
                                <SpecificBook />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path='/cart'
                        element={
                            <RequireAuth>
                                <Cart />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path='*'
                        element={
                            <RequireAuth>
                                {user ? <NotFoundBlock /> : <Signin />}
                            </RequireAuth>
                        }
                    />
                </Routes>
                <Footer />
            </MainContextProvider>
        </div>
    );
}

export default App;
