import { Dispatch, useCallback } from 'react';
import { TockAction, useTockDispatch } from './TockContext';

export interface UseLocalTools {
  clearMessages: () => void;
}

const useLocalTools: () => UseLocalTools = () => {
  const dispatch: Dispatch<TockAction> = useTockDispatch();
  const clearMessages: () => void = useCallback(
    () =>
      dispatch({
        type: 'CLEAR_MESSAGES',
      }),
    [],
  );
  return {
    clearMessages,
  };
};

export default useLocalTools;
