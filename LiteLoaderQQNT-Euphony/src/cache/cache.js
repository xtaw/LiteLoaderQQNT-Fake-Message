/**
 * `Cache` 类是一个工具类，它用于缓存一些对象数据。
 * 
 * 当一个函数返回的数据很少发生改变时，应使用此工具类，将结果缓存，以减少开销。
 * 
 * @property { Map } #caches 缓存数据。
 */
class Cache {

    static #caches = new Map();

    /**
     * 将 `defaultSupplier` 返回的数据以 `key` 为键缓存，并返回数据。
     * 
     * @param { any } key 缓存的键。
     * @param { Function } defaultSupplier 返回默认数据的函数。
     * @returns { any } 缓存数据。
     */
    static withCache(key, defaultSupplier) {
        let value = Cache.#caches.get(key);
        if (!value) {
            value = defaultSupplier();
            Cache.#caches.set(key, value);
        }
        return value;
    }

    /**
     * 将 `defaultSupplier` 返回的数据以 `key` 为键缓存，并返回数据。
     * 
     * @param { any } key 缓存的键。
     * @param { Function } defaultSupplier 返回默认数据的异步函数。
     * @returns { any } 缓存数据。
     */
    static async withCacheAsync(key, defaultSupplier) {
        let value = Cache.#caches.get(key);
        if (!value) {
            value = await defaultSupplier();
            Cache.#caches.set(key, value);
        }
        return value;
    }

}

export default Cache