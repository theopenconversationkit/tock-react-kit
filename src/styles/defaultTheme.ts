import { readableColor } from 'polished';
import TockTheme from './theme';

const defaultTheme: TockTheme = {
  palette: {
    text: {
      user: 'black',
      bot: 'white',
      card: 'black',
      input: 'black',
    },
    background: {
      user: readableColor('black'),
      bot: readableColor('white'),
      card: readableColor('black'),
      input: readableColor('black'),
      inputDisabled: '#b6b4b4',
    },
  },
  sizing: {
    loaderSize: '8px',
    borderRadius: '1em',
    conversation: {
      width: '720px',
    },
    autoCarouselResizing: {
      active: false,
      marginDelta: "0",
      paddingDelta: "1em",
    }
  },
  typography: {
    fontFamily: 'Segoe UI, Arial, Helvetica, sans-serif',
    fontSize: '16px',
  },
};

export default defaultTheme;
