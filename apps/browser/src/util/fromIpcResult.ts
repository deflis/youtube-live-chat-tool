import { IpcResult } from "ipc-interfaces/ipc";

export async function fromIpcResult<T>(res: IpcResult<T>): Promise<T> {
  const _res = await res;
  if (_res.status === false) throw _res.error;
  return _res.result;
}
