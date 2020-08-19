import { Overrides } from './overrides';
import { Palette, PaletteOptions } from './palette';
import { Sizing, SizingOptions } from './sizing';
import { Typography, TypographyOptions } from './typography';

export default interface TockTheme {
  palette: Palette;
  sizing: Sizing;
  typography: Typography;
  overrides?: Overrides;
}

export type TockThemeOptions = {
  palette?: PaletteOptions;
  sizing?: SizingOptions;
  typography?: TypographyOptions;
  overrides?: Overrides;
};
