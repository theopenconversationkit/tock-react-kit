import { Dispatch, useCallback } from 'react';
import { TockAction, useTockDispatch } from './TockContext';
import TockLocalStorage from './TockLocalStorage';
import { retrievePrefixedLocalStorageKeyName } from './utils';

export interface UseLocalTools {
  clearMessages: () => void;
}

const useLocalTools: (
  localStorageHistory?: TockLocalStorage,
) => UseLocalTools = (localStorageHistory) => {
  const dispatch: Dispatch<TockAction> = useTockDispatch();
  const clearMessages: () => void = useCallback(() => {
    if (localStorageHistory?.enable) {
      const messageHistoryLSKeyName = retrievePrefixedLocalStorageKeyName(
        localStorageHistory,
        'tockMessageHistory',
      );
      const quickReplyHistoryLSKeyName = retrievePrefixedLocalStorageKeyName(
        localStorageHistory,
        'tockQuickReplyHistory',
      );
      window.localStorage.removeItem(messageHistoryLSKeyName);
      window.localStorage.removeItem(quickReplyHistoryLSKeyName);
    }
    dispatch({
      type: 'CLEAR_MESSAGES',
    });
  }, []);
  return {
    clearMessages,
  };
};

export default useLocalTools;
