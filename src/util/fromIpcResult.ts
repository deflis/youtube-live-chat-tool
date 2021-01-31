import { Promisable, PromiseValue } from "type-fest";

import { IpcResult } from "../interface/ipc";

export async function fromIpcResult<T>(res: IpcResult<T>): Promise<T> {
  const _res = await res;
  if (!_res.status) throw _res.error;
  return _res.result;
}
