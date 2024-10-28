import { Dispatch, useCallback } from 'react';
import { retrievePrefixedLocalStorageKey } from './utils';
import { useTockSettings } from './settings/TockSettingsContext';
import { TockAction, useTockDispatch } from './TockState';

export interface UseLocalTools {
  clearMessages: () => void;
}

const useLocalTools: (localStorage?: boolean) => UseLocalTools = (
  localStorage,
) => {
  const { localStorage: localStorageSettings } = useTockSettings();
  const localStorageEnabled =
    localStorage ?? localStorageSettings.enableMessageHistory;
  const localStoragePrefix = localStorageSettings.prefix;

  const dispatch: Dispatch<TockAction> = useTockDispatch();

  const clearMessages: () => void = useCallback(() => {
    if (localStorageEnabled) {
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
  }, [localStorageEnabled, localStoragePrefix]);
  return {
    clearMessages,
  };
};

export default useLocalTools;
