import { Promisable, PromiseValue } from "type-fest";

import { IpcResult } from "../interface/ipc";

export function toIpcResult<T extends (...args: any[]) => Promisable<any>>(
  f: T
): (...args: Parameters<T>) => IpcResult<PromiseValue<ReturnType<T>>> {
  return async (...args) => {
    try {
      return {
        status: true,
        result: await f(...args),
      };
    } catch (e) {
      console.error(e);
      return {
        status: false,
        error: e,
      };
    }
  };
}
