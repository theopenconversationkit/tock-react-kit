/**
 * Retrieves persisted user id.
 */
export const retrieveUserId: () => string = () =>
  fromLocalStorage('userId', () => {
    const date = Date.now().toString(36);
    const randomNumber = Math.random().toString(36).substr(2, 5);
    return (date + randomNumber).toUpperCase();
  });

/**
 * Retrieves and returns an object from the local storage if found.
 * If the value is not found it will save an initialValue before returning it.
 * @param key - key in local storage
 * @param computeInitialValue - function to create an initial value if the object is not found
 */
export const fromLocalStorage: (
  key: string,
  computeInitialValue: () => any,
) => any = (key: string, computeInitialValue: () => any) => {
  try {
    const item = window.localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } else {
      const initialValue = computeInitialValue();
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  } catch (error) {
    console.log(error);
    return computeInitialValue();
  }
};
