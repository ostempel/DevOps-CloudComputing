import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    min-height: 100%;
    min-height: 100%;
    background: rgb(2,0,36);
    background: linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(94,25,172,1) 0%, rgba(17,4,78,1) 100%);
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    margin: 0;
    padding: 0;
    color: white;
    font-size: 2em;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  h1 {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: white;
    margin: 0;
    padding: 0;
  }
`;
