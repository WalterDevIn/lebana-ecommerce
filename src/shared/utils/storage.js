const FAVORITES = "f";
const CART = "c";

class Storage {

    read(key, fallback) {
        try { 
            const value = JSON.parse(localStorage.getItem(key)); 
            return Array.isArray(value) ? value : fallback; 
        }
        catch { return fallback; }
    }

    write(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

}

const storage = new Storage();

export default Storage;
export {
    storage,
    FAVORITES,
    CART
};