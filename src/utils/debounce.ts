type FN = (...args: any[]) => void;

export function debounce<T extends FN>(fn: T, delay: number)
: (...args: Parameters<T>) => ReturnType<T> {
  let I: any = null;
  return (...args: any[]) => {
    if (I) {
      clearTimeout(I);
    }
    let returnValue: any;
    I = setTimeout(() => {
      returnValue = fn(...args);
    }, delay);
    return returnValue;
  }
}