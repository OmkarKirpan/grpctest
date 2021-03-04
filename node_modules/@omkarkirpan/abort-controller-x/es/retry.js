import { delay } from './delay';
import { rethrowAbortError } from './AbortError';
/**
 * Retry function with exponential backoff.
 */
export async function retry(signal, fn, options = {}) {
    const { baseMs = 1000, maxDelayMs = 15000, onError, maxAttempts = Infinity, } = options;
    for (let attempt = 0;; attempt++) {
        try {
            return await fn(signal, attempt);
        }
        catch (error) {
            rethrowAbortError(error);
            if (attempt >= maxAttempts) {
                throw error;
            }
            // https://aws.amazon.com/ru/blogs/architecture/exponential-backoff-and-jitter/
            const backoff = Math.min(maxDelayMs, Math.pow(2, attempt) * baseMs);
            const delayMs = Math.round((backoff * (1 + Math.random())) / 2);
            if (onError) {
                onError(error, attempt, delayMs);
            }
            await delay(signal, delayMs);
        }
    }
}
//# sourceMappingURL=retry.js.map