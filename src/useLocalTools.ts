import { Dispatch, useCallback } from 'react';
import { TockAction, useTockSettings, useTockDispatch } from './TockContext';
import { retrievePrefixedLocalStorageKey } from './utils';

export interface UseLocalTools {
  clearMessages: () => void;
}

const useLocalTools: (localStorage?: boolean) => UseLocalTools = (
  localStorage,
) => {
  const dispatch: Dispatch<TockAction> = useTockDispatch();
  const {
    localStorage: { prefix: localStoragePrefix },
  } = useTockSettings();

  const clearMessages: () => void = useCallback(() => {
    if (localStorage === true) {
      const messageHistoryLSKeyName = retrievePrefixedLocalStorageKey(
        localStoragePrefix,
        'tockMessageHistory',
      );
      const quickReplyHistoryLSKeyName = retrievePrefixedLocalStorageKey(
        localStoragePrefix,
        'tockQuickReplyHistory',
      );
      window.localStorage.removeItem(messageHistoryLSKeyName);
      window.localStorage.removeItem(quickReplyHistoryLSKeyName);
    }
    dispatch({
      type: 'CLEAR_MESSAGES',
    });
  }, [localStorage, localStoragePrefix]);
  return {
    clearMessages,
  };
};

export default useLocalTools;
