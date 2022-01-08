import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'
    const GlobalStyle = createGlobalStyle`
      .pc {
        --c: 2199;
      }
      .mobile {
        --c: 1099;
      }
      ${reset}
      * {
        font-family: 'Noto Sans KR', sans-serif;
        box-sizing: border-box;
      }
      body{
        font-family: 'Noto Sans KR', sans-serif;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      input, button {
        font-family: 'Noto Sans KR', sans-serif;
      }
      h1, h2, h3, h4, h5, h6{
      }
      .inner_circle {
        stroke: white;
      }
      @keyframes dash {
          from{
            stroke-dashoffset: var(--c);
          }
          to {
            stroke-dashoffset:0;
          }
      }
    `

    export default GlobalStyle;