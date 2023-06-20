import deepmerge from 'deepmerge';
import TockTheme, { TockThemeOptions } from './theme';
import defaultTheme from './defaultTheme';
import { PartialDeep } from 'type-fest';

export default function createTockTheme<T extends TockTheme = TockTheme>(
  theme: PartialDeep<TockThemeOptions> = {},
): T {
  return deepmerge<T>(defaultTheme as Partial<T>, theme as Partial<T>);
}
