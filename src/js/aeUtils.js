export function isObject(obj) {
    return obj && typeof obj === 'object' && !Array.isArray(obj);
}

export function mergeObject(dst, src) {
    if (isObject(dst) && isObject(src)) {
        for (const key in src) {
            if (isObject(src[key]) && key in dst) mergeObject(dst[key], src[key]);
            else Object.assign(dst, { [key]: src[key] });
        }
    }
}

export function cloneObject(obj) {
    let copy;

    if (obj === null || 'object' !== typeof obj) return obj;

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) copy[i] = cloneObject(obj[i]);
        return copy;
    }

    if (obj instanceof Object) {
        copy = {};
        for (let attr in obj) {
            if (attr === '__proto__') continue;
            if (attr === '__ob__') continue;
            if (obj.hasOwnProperty(attr)) copy[attr] = cloneObject(obj[attr]);
        }
        return copy;
    }

    return null;
}
