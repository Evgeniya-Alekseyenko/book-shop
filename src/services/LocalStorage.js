const LS_KEYS = {
    USER: 'user',
    CART: 'cart',
};

class LocalStorageService {
    static get(key) {
        const value = window.localStorage.getItem(key);

        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    }

    static getUserCart() {
        const username = this.get(LS_KEYS.USER);
        const cart = this.get(LS_KEYS.CART);
        return cart && cart[`${username}`] ? cart[`${username}`] : [];
    }

    static setUserCart(value) {
        const username = this.get(LS_KEYS.USER);
        const cart = this.get(LS_KEYS.CART) || {};
        cart[username] = value;
        this.set(LS_KEYS.CART, cart);
    }

    static removeUserCart() {
        const username = this.get(LS_KEYS.USER);
        const cart = this.get(LS_KEYS.CART);
        delete cart[username];
        this.set(LS_KEYS.CART, cart);
    }

    static set(key, value) {
        return window.localStorage.setItem(key, JSON.stringify(value));
    }

    static remove(key) {
        return window.localStorage.removeItem(key);
    }

    static removeAll() {
        return window.localStorage.clear();
    }
}

export { LocalStorageService, LS_KEYS };
