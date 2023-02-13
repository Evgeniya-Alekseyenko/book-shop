// import React, { useEffect } from 'react';

// export const AuthContext = React.createContext('');

// export const AuthProvider = ({ children }) => {
//     // const [user, setUser] = React.useState('');
//     // console.log('user', user);

//     const [log, setLog] = React.useState(false);
//     console.log('log', log);

//     useEffect(() => {
//         localStorage.setItem('log', log);
//         if (user) {
//             setLog(true);
//         } else {
//             setLog(false);
//         }
//     }, [log, user]);

//     const signin = (newUser, cb) => {
//         // setUser(newUser);
//         console.log(newUser);
//         cb('');
//     };
//     const signout = (cb) => {
//         setUser('');
//         // cb();
//     };
//     const value = { user, signin, signout };

//     return (
//         <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//     );
// };

// import React from 'react';

// export const AuthContext = React.createContext('');
// export const AuthProvider = ({ children }) => {
//     const [cartItem, setCartItem] = React.useState();
//     console.log(cartItem);

//     React.useEffect(() => {
//         fetch('https://63da5cca2af48a60a7cbb748.mockapi.io/books')
//             .then((response) => response.json())
//             // .then((response) => console.log(response));
//             .then((arr) => {
//                 setCartItem(arr);
//             });
//     }, []);

//     // return (
//     //       <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

//     // )
// };
