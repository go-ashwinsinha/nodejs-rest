const NodeCache = require('node-cache')

const localCache = new NodeCache()

/**
 * Get Cached value for Key
 * @param {string|number} key Key to look in cache store
 * @returns {*} value of key OR Undefined
 */
const getValue = (key) => {
    return localCache.get(key)
}

/**
 *
 * @param {string|number} key  - Unique Id as key
 * @param {*} value - value to be cached
 * @param {number}[] Optional TTL time in Seconds
 * @returns {boolean} status
 */
const setValue = (key, value, time = 0) => {
    return localCache.set(key, value, time)
}

/**
 * Set mutiple key-value in one request
 * @param {Object[]} listOfValues - a list of literal filter objects
 * @param {string|number} listOfValues[].key -  id to for value
 * @param {*} listOfValues[].value - value
 * @param {number} listOfValues[].ttl - ttl value in seconds
 * @returns {boolean} status
 */
const setMutipleValue = (listOfValues) => {
    return localCache.mset(listOfValues)
}

module.exports = {
    getValue,
    setValue,
    setMutipleValue
}