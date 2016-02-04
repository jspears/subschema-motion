function hash(string) {
    "use strict";
    let hash = 0;
    if (!string) return hash;
    const length = string.length;
    if (length == 0) return hash;
    for (let i = 0; i < length; i++) {
        hash = ((hash << 5) - hash) + string.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }
    return (hash).toString(16);
}
export default  hash;