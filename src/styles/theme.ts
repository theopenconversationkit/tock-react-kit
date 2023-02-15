import { Overrides } from './overrides';
import { Palette, PaletteOptions } from './palette';
import { Sizing, SizingOptions } from './sizing';
import { Typography, TypographyOptions } from './typography';
import { Theme } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    palette: Palette;
    sizing: Sizing;
    typography: Typography;
    overrides?: Overrides;
    inlineQuickReplies?: boolean;
  }
}

type TockTheme = Theme;
export default TockTheme;

export type TockThemeOptions = {
  palette?: PaletteOptions;
  sizing?: SizingOptions;
  typography?: TypographyOptions;
  overrides?: Overrides;
  inlineQuickReplies?: boolean;
};
