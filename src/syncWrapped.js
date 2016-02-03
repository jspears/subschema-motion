"use strict";

let MAX_ID = 0;

function findMatchValue(values, value) {
    for (let i = 0, l = values.length; i < l; i++) {
        if (values[i].value === value) {
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
export default function wrapValue(wrapped, values) {
    values = values || [];
    wrapped = wrapped || [];
    const length = values.length;
    const copy = new Array(length);
    const match = wrapped && wrapped.length ? findMatchValue : noop;

    //should create a unique key for new elements.
    let hasChange = wrapped.length !== values.length;
    for (let i = 0; i < length; i++) {
        const value = values[i];
        //if it hasn't changed, than we don't need to do anything.
        if (!hasChange && wrapped[i] && wrapped[i].value === value) {
            wrapped[i].pid = i;
            wrapped[i].id = wrapped[i].id || '' + (MAX_ID++);
            continue;
        }
        if (hasChange === false && i > 0 ){
            //reset the loop.
            i=-1;
            hasChange = true;
            continue;
        }
        hasChange = true;
        const exists = match(wrapped, value);
        if (exists !== void(0)) {
            copy[i] = exists;
            if (!exists.pid) {
                exists.pid = i;
                hasChange = true;
            }
        } else {

            copy[i] = {value, pid: i, key: i, id: '' + (MAX_ID++)};
        }
    }
    return hasChange ? copy : wrapped;
}
