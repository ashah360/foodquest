import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
      box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  * {
    vertical-align: baseline;
    font-weight: inherit;
    font-family: inherit;
    font-style: inherit;
  }


  body {
    min-height: 100%;
    font-family: BlinkMacSystemFont;
    background: ${({ theme }) => theme.color.gray[100]}
  }

  html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
      }

  /**
    ReactModal Overrides
  */
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  .ReactModal__Overlay--after-open{
      opacity: 1;
  }

  .ReactModal__Overlay--before-close{
      opacity: 0;
  }

  input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`;
