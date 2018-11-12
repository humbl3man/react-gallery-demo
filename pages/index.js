import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Gallery from '../components/Gallery';

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  body {
    background: #eee;
  }

`;

export default () => (
  <div>
    <GlobalStyle />
    <Gallery />
  </div>
);
