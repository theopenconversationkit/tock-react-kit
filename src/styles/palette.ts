interface BackgroundPalette {
  user: string;
  bot: string;
  card: string;
  input: string;
  inputDisabled: string;
}

interface TextPalette {
  user: string;
  bot: string;
  card: string;
  input: string;
}

export interface Palette {
  background: BackgroundPalette;
  text: TextPalette;
}

export type PaletteOptions = {
  background?: Partial<BackgroundPalette>;
  text?: Partial<TextPalette>;
};
