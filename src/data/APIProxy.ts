import { getTodoAPIMaxTimeMilliSeconds } from "../config";
import { APIError, APIErrorCode } from "./APIError";

/**
 * A generic proxy used to wrap api calls with a common
 * abort and error managment strategy.
 */
export function createAPIProxy<ApiTarget extends object>(
    target: ApiTarget,
    endpoint: string
): ApiTarget { 
    return new Proxy(target, {
        get(target: ApiTarget, property: PropertyKey, receiver: unknown): unknown {
            const targetProperty = Reflect.get(target, property, receiver);

            if (typeof targetProperty !== "function") {
                return targetProperty;
            }

            return async function (...args: unknown[]): Promise<unknown> {
                const [timeoutId, signal] = getTimoutSignal(getTodoAPIMaxTimeMilliSeconds());
                try {
                    const extendedArgs = [...args, signal];
                    const result = await targetProperty.apply(target, extendedArgs);
                    clearTimeout(timeoutId);
                    return result;
                } catch (err) {
                    clearTimeout(timeoutId);
                    if (err instanceof APIError && err.errorCode === APIErrorCode.ABORTED) {
                        throw new APIError(`The request was aborted from ${endpoint}`, err);
                    } else if (err instanceof Error) {
                        throw new APIError(`Api error when requesting data from ${endpoint}`, err);
                    } else {
                        throw new  APIError();
                    }
                }
            };
        }
    });
}

function getTimoutSignal (timeout = 15000): [NodeJS.Timeout, AbortSignal] {
    const controller = new AbortController();
    const { signal } = controller;
    const reason = `The request was aborted due delay extended ${timeout}.`;

    const timeoutId = setTimeout(() => controller.abort(
        new APIError(reason, null, APIErrorCode.ABORTED)
    ), timeout);
    return [timeoutId, signal];
}
