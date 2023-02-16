import React from 'react';

export const CartContext = React.createContext({ cart: [], setCart: () => {} });

export function CartContextProvider({ children }) {
    const [cart, setCart] = React.useState(localStorage.getItem('cart'));

    // localStorage.setItem('cartLength', JSON.parse(cart).length);
    // const [countCartItem, setCountCartItems] = React.useState(0);
    //
    // console.log(cart);

    // const onChangeCountCartItems = (one) => {
    //     setCountCartItems(countCartItem + one);
    //   }

    // const changCartCount = () => {
    //     if(cart) {
    //     setcountCartItem(JSON.parse(cart).length)
    //     } else {
    //         setcountCartItem(0)
    //     }
    // }

    // React.useEffect(() => {
    // }, []);

    // console.log(JSON.parse(cart).length);

    // React.useEffect(() => {
    //     setcountCartItem(cart ? JSON.parse(cart).length : 0);
    // }, [cart, countCartItem]);

    //       setcountCartItem: function (countCartItem) {
    //                 if (cart) {
    //                         setcountCartItem(JSON.parse(cart).length)
    //                     } else {
    // setcountCartItem(0)
    //                     }
    //                 );

    const contextValue = React.useMemo(
        () => ({
            cart,
            setCart: function (newCart) {
                if (newCart) {
                    setCart(newCart);
                    localStorage.setItem('cart', newCart);
                } else {
                    setCart();
                    localStorage.removeItem('cart');
                }
            },
        }),
        [cart]
    );

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}
