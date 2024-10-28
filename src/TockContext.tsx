import { JSX, ReactNode, useReducer } from 'react';
import deepmerge from 'deepmerge';
import { retrieveUserId } from './utils';
import TockSettings, {
  defaultSettings,
  TockOptionalSettings,
} from './settings/TockSettings';
import { TockNetworkContext } from './network/TockNetworkContext';
import { tockReducer, TockStateContext, TockStateDispatch } from './TockState';
import { TockSettingsContext } from './settings/TockSettingsContext';

const TockContext: (props: {
  children?: ReactNode;
  endpoint?: string; // will be required in a future release
  settings?: TockOptionalSettings;
}) => JSX.Element = ({
  children,
  endpoint,
  settings = {},
}: {
  children?: ReactNode;
  endpoint?: string;
  settings?: TockOptionalSettings;
}): JSX.Element => {
  const mergedSettings = deepmerge(defaultSettings, {
    endpoint,
    ...settings,
  }) as TockSettings;
  const [state, dispatch] = useReducer(tockReducer, {
    quickReplies: [],
    messages: [],
    userId: retrieveUserId(mergedSettings.localStorage.prefix),
    loading: false,
    sseInitializing: false,
    metadata: {},
    error: false,
  });
  return (
    <TockSettingsContext.Provider value={mergedSettings}>
      <TockStateContext.Provider value={state}>
        <TockStateDispatch.Provider value={dispatch}>
          {endpoint ? (
            <TockNetworkContext endpoint={endpoint} settings={mergedSettings}>
              {children}
            </TockNetworkContext>
          ) : (
            children
          )}
        </TockStateDispatch.Provider>
      </TockStateContext.Provider>
    </TockSettingsContext.Provider>
  );
};

export default TockContext;
