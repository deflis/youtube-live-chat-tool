export function swapArrayElements<T>(array: ArrayLike<T>, index: number): T[] {
  const newArray = Array.from(array);
  [newArray[index], newArray[index + 1]] = [array[index + 1], array[index]];
  return newArray;
}
