import { Context, createContext, useContext } from 'react';
import TockSettings from './TockSettings';

export const TockSettingsContext: Context<TockSettings | undefined> =
  createContext<TockSettings | undefined>(undefined);

export const useTockSettings: () => TockSettings = () => {
  const settings = useContext(TockSettingsContext);
  if (!settings) {
    throw new Error('useTockSettings must be used in a TockContext');
  }
  return settings;
};
