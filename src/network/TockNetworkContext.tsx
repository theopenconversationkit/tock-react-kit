import { JSX, PropsWithChildren } from 'react';
import { useTock0, UseTockContext } from '../useTock';
import TockSettings from '../settings/TockSettings';

type Props = PropsWithChildren<{
  endpoint: string;
  settings: TockSettings;
}>;

export const TockNetworkContext = ({
  children,
  endpoint,
  settings,
}: Props): JSX.Element => {
  const tock = useTock0(endpoint, settings);
  return (
    <UseTockContext.Provider value={tock}>{children}</UseTockContext.Provider>
  );
};
