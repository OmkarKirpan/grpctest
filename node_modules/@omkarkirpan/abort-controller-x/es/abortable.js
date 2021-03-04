import { execute } from './execute';
/**
 * Wrap a promise to reject with `AbortError` once `signal` is aborted.
 *
 * Useful to wrap non-abortable promises.
 * Note that underlying process will NOT be aborted.
 */
export function abortable(signal, promise) {
    return execute(signal, (resolve, reject) => {
        promise.then(resolve, reject);
        return () => { };
    });
}
//# sourceMappingURL=abortable.js.map