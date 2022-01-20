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
      input:focus { outline: none; }
      h1, h2, h3, h4, h5, h6{
      }

      .inp {
        position: relative;
        margin: auto;
        width: 100%;
        max-width: 280px;
        border-radius: 3px;
        overflow: hidden;
      }

  .label{
    position: absolute;
    top: 20px;
    left: 12px;
    font-size: 16px;
    color: rgba(000,.5);
    font-weight: 500;
    transform-origin: 0 0;
    transform: translate3d(0,0,0);
    transition: all .2s ease;
    pointer-events: none;
  }
  .focus-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(000,.05);
    z-index: -1;
    transform: scaleX(0);
    transform-origin: left;
  }
  input{
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    border: 0;
    font-family: inherit;
    padding: 16px 12px 0 12px;
    height: 56px;
    font-size: 16px;
    font-weight: 400;
    background: rgba(000,.02);
    box-shadow: inset 0 -1px 0 rgba(000,.3);
    color: 000;
    transition: all .15s ease;

    :hover{
      background: rgba(000,.04);
      box-shadow: inset 0 -1px 0 rgba(000,.5);
    }
    :not(:placeholder-shown){
      + .label{
        color: rgba(000,.5);
        transform: translate3d(0,-12px,0) scale(.75);
      }
    }
    :focus {
      background: rgba(000,.05);
      outline: none;
      box-shadow: inset 0 -2px 0 #0077FF;
      + .label{
        color: #0077FF;
        transform: translate3d(0,-12px,0) scale(.75);
      }
        + .focus-bg{
          transform: scaleX(1);
          transition: all .1s ease;
      }
    }
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