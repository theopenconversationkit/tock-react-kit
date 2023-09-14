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
export const fromLocalStorage = <T>(
  key: string,
  computeInitialValue: () => T,
): T => {
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

/**
 * Detects whether localStorage is both supported and available.
 * @param type - Storage type
 * @returns true - if locale storage is available on the user's browser
 */
export const storageAvailable: (type: string) => boolean = (type) => {
  let storage = undefined;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage?.length !== 0
    );
  }
};
