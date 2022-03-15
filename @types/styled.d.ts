// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  /* eslint-disable no-unused-vars */
  type ColorsNames =
    | 'rose'
    | 'pink'
    | 'fuchsia'
    | 'purple'
    | 'violet'
    | 'indigo'
    | 'blue'
    | 'sky'
    | 'cyan'
    | 'teal'
    | 'emerald'
    | 'green'
    | 'lime'
    | 'yellow'
    | 'amber'
    | 'orange'
    | 'red'
    | 'warmGray'
    | 'trueGray'
    | 'gray'
    | 'coolGray'
    | 'blueGray';

  type ColorsVariations =
    | 50
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900;

  type MainColors = {
    black: string;
    white: string;
  };

  type Colors = MainColors &
    Record<
      ColorsNames,
      {
        [K in ColorsVariations]: string;
      }
    >;

  export interface DefaultTheme {
    color: Colors;
    spacing: {
      xxSmall: number;
      xSmall: number;
      small: number;
      medium: number;
      large: number;
      xLarge: number;
      xxLarge: number;
    };
    font: {
      sizing: {
        xxSmall: number;
        xSmall: number;
        small: number;
        medium: number;
        large: number;
        xLarge: number;
        xxLarge: number;
      };
      weight: {
        light: number;
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
        heavy: number;
      };
    };
  }
}
