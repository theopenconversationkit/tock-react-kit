import { ThemeProvider, ThemeProviderProps } from 'emotion-theming';
import * as React from 'react';
import deepmerge from 'deepmerge';
import { createTheme, TockTheme } from '../index';

export default function TockThemeProvider<Theme>(
  props: ThemeProviderProps<Theme>,
): React.ReactElement {
  const theme = props.theme as TockTheme;
  if (!theme.overrides) {
    console.warn(
      '[Theme deprecated] You seem providing a deprecated theme.\n Since version 20.3.4 you must provide a theme build by using "createTheme" function and the new TockTheme interface.',
    );
    return ThemeProvider(
      deepmerge<ThemeProviderProps<Theme>>(
        { theme: createTheme({}) as Partial<Theme> },
        { ...props },
      ),
    );
  } else {
    return ThemeProvider(props);
  }
}
