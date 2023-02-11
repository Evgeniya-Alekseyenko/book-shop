import React from 'react';
import { Route, Routes } from 'react-router';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Signin from './components/Signin/Signin.jsx';
import SpecificBook from './components/Specific-book/SpecificBook.jsx';
import Booklist from './components/Book-list/Booklist.jsx';
import NotFoundBlock from './components/NotFoundPage/NotFoundPage.jsx';
import CartEmpty from './components/Cart/CartEmpty.jsx';

import { RequireAuth } from './hooks/RequireAuth.jsx';

import './scss/app.scss';

const user = JSON.parse(localStorage.getItem('user'));

function App() {
    return (
        <div className='wrapper'>
            {/* <AuthProvider> */}
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
                            <CartEmpty />
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
                    // element={user ? <NotFoundBlock /> : <Signin />}
                />
            </Routes>
            <Footer />
            {/* </AuthProvider> */}
        </div>
    );
}

export default App;

// проверить наименование папок (hooks?)
