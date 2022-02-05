import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
    const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: 'SpoqaHanSansNeo-Medium';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Medium.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
      .pc {
        --c: 2199;
      }
      .mobile {
        --c: 1099;
      }
      ${reset}
      * {
        font-family: 'SpoqaHanSansNeo-Medium', sans-serif;
      }
      body{
        font-family: 'SpoqaHanSansNeo-Medium',sans-serif;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      button {
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        border-radius: 7px;
      }
      input {
        border: 1px solid grey;
        border-radius:5px;
        text-align: center;
        font-size:1.2rem;
      }
      input:focus { outline: none; }
      span {
        font-size: 1.1rem;
      }
      label {
        font-size: 1.2rem;
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