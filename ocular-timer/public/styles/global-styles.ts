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
      }
      body{
        font-family: 'Noto Sans KR', sans-serif;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      button {
        cursor: pointer;
      }
      h1, h2, h3, h4, h5, h6{
      }
      .inner_circle {
        stroke: white;
      }
      .rhap_play-pause-button{
        font-size: 35px;
      }
      .rhap_container {
        -webkit-box-shadow: none;
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