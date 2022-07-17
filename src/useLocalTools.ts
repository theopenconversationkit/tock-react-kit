import { Dispatch, useCallback } from 'react';
import { TockAction, useTockDispatch } from './TockContext';

export interface UseLocalTools {
  clearMessages: () => void;
}

const useLocalTools: (localStorage?: boolean) => UseLocalTools = (
  localStorage,
) => {
  const dispatch: Dispatch<TockAction> = useTockDispatch();
  const clearMessages: () => void = useCallback(() => {
    if (localStorage === true) {
      window.localStorage.removeItem('tockMessageHistory');
      window.localStorage.removeItem('tockQuickReplyHistory');
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
