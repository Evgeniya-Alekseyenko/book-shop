import React from 'react';

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);

    const signin = (newUser, cb) => {
        setUser(newUser);
        cb();
    };
    const signout = (cb) => {
        setUser(null);
        cb();
    };
    const value = { user, signin, signout };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
