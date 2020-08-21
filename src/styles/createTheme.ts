import deepmerge from 'deepmerge';
import TockTheme, { TockThemeOptions } from './theme';
import defaultTheme from './defaultTheme';

export default function createTockTheme<T extends TockTheme = TockTheme>(
  theme: TockThemeOptions,
): T {
  return deepmerge<T>(defaultTheme as Partial<T>, theme as Partial<T>);
}
