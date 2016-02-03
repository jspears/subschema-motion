"use strict";

function findMatchValue(values, value) {
    for (let i = 0, l = values.length; i < l; i++) {
        if (values[i].value === value) {
            return values[i];
        }
    }
    return;
}
/**

 * @param wrapped
 * @param values
 * @returns {Array}
 */
export default function wrapValue(wrapped, values) {
    values = values || [];
    const length = values.length;
    const copy = new Array(length);
    //should create a unique key for new elements.
    let key = Math.max(wrapped.length, values.length);
    for (let i = 0; i < length; i++) {
        const value = values[i];
        const exists = findMatchValue(wrapped, value);
        if (exists !== void(0)) {
            copy[i] = exists;
        } else {
            copy[i] = {value, key: key++};
        }
    }
    return copy;
}
