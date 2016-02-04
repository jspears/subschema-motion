"use strict";

let MAX_ID = 0;

function findMatchValue(values, value, id) {
    for (let i = 0, l = values.length; i < l; i++) {
        if (values[i].id === id(value)) {
            return values[i];
        }
    }
    return;
}
function noop() {
    return;
}

/**

 * @param wrapped
 * @param values
 * @returns {Array}
 */
export default function wrapValue(wrapped, values, id) {
    values = values || [];

    const length = values.length;
    const copy = new Array(length);
    const match = wrapped && wrapped.length ? findMatchValue : noop;

    //should create a unique key for new elements.
    for (let i = 0; i < length; i++) {
        const value = values[i];
        const exists = match(wrapped, value, id);
        if (exists !== void(0)) {
            (copy[i] = exists).pid = i;
            exists.value = value;
        } else {
            copy[i] = {value, pid: i, key: i, id: id(value)};
        }
    }
//    console.log(copy.map(v=>`${v.pid} ${v.id}`).join('\n'))
    return copy;
}
