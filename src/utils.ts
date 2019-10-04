import TockTheme from './TockTheme';

export const fontSize: (theme: TockTheme) => number = (theme: TockTheme) => {
  let size: number = 16;
  const pxValueRegexp: RegExp = /^(\d+)px$/;
  if (theme && pxValueRegexp.test(theme.fontSize as string)) {
    const [pxValue]: RegExpExecArray = pxValueRegexp.exec(
      theme.fontSize as string
    ) as RegExpExecArray;
    size = parseInt(pxValue, 10);
  }
  return size;
};
