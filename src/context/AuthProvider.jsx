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
