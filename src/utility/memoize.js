export const memoize = (fn) => {
    let cache = {};

    return (...args) => {
        const argString = JSON.stringify(fn) + JSON.stringify(args);

        cache[argString] = cache[argString] || fn(argString);

        return cache[argString];
    };
};
