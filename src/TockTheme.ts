export interface TockTheme {
  fontFamily?: string;
  fontSize?: string;
  botMessage?: {
    color?: string;
    background?: string;
    borderRadius?: string;
    padding?: string;
  };
  userMessage?: {
    color?: string;
    background?: string;
    borderRadius?: string;
    padding?: string;
  };
  chat?: {
    background?: string;
    maxWidth?: string;
  };
}

export default TockTheme;
