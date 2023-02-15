// import React from 'react';

// export const AuthContext = React.createContext('');

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = React.useState(
//         localStorage.getItem('userName') || ''
//     );

//     const signin = (newUser, cb) => {
//         setUser(newUser);
//         cb();
//     };
//     const signout = (cb) => {
//         setUser('');
//         cb();
//     };
//     const value = { user, signin, signout };

//     return (
//         <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//     );
// };
