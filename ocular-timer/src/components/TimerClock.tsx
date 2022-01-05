import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Mobile, PC } from '../components/MediaQuery';
import { useMediaQuery } from "react-responsive"
interface ClockCircleSvg {
  time: number;
}

interface ClockCircle {
  time: number;
  targetTime: number;
  done: boolean;
  circumference: number;
  pause: boolean;
}

interface Iprops {
  target: number;
  color: string;
}

const ClockWrapper = styled.div`
  display: flex;
  margin: auto;
  margin-top: 3%;
  width: 800px;
  height: 800px;

  @media ${(props) => props.theme.tablet} {
    width: 100%;
    height: auto;
    margin-top: 15%;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: auto;
    margin-top: 35%;
  }
`;

const ClockCircleWrapper = styled.svg<ClockCircleSvg>`
  position: relative;
  width: 700px;
  height: 700px;
  margin: auto;
  transform: rotate(-90deg);
  @media ${(props) => props.theme.mobile} {
    width: 350px;
    height: 350px;
  }
`;

const ClockCircle = styled.circle<ClockCircle>`
  fill: none;
  stroke: #ffff;
  cx: 350;
  cy: 350;
  r: 350;
  stroke-width: 700;
  stroke-dasharray: ${(props)=>props.circumference};
  animation: ${(props)=> (!props.done && props.time===0) ? null : `dash ${props.targetTime}s linear infinite`};
  visibility: ${(props)=> props.done || props.time===0 ? 'hidden' : 'visible'};
  animation-play-state: ${(props)=> props.pause ? "paused" : "running"};
  @keyframes dash {
    from{
      stroke-dashoffset: 2200;
    }
    to {
      stroke-dashoffset:0;
    }
  }
  @media ${(props) => props.theme.mobile} {
    cx: 175;
    cy: 175;
    r: 175;
    stroke-width: 350;
  }
`;

const TimerClock = (props: Iprops) => {
  const [time, setTime] = useState(0);
  const [done, setDone] = useState(false);
  const [pause, setPause] = useState(false);
  const [started, setStarted] = useState(false);
  const isMobile = useMediaQuery({
    query: "(max-width:767px)"
  });

  const radius = isMobile ? 175 : 350;
  const circumference = 2 * Math.PI * radius;

  const target: number = props.target;

  useEffect(()=>{
    const interval = setInterval(()=> {
      if(!pause && started){
        setTime(prevTime => prevTime+1);
      }
    }, 1000);

    if(time === target){
      clearInterval(interval);
      setDone(true);
      setTime(0);
      setStarted(false);
    }
    return () => clearInterval(interval);
  });

  const onClickStart = () => {
    setPause(false);
    setStarted(true);
    setDone(false);
  }

  const onClickPause = () => {
    setPause(true);
  }


  return (
  <>
    <PC>
      <div>
        <ClockWrapper>
          <ClockCircleWrapper onClick={() => console.log("테스트")} time={time}>
            <circle cx="350" cy="350" r="350" fill={props.color} />
            <circle 
            className="inner_circle pc"
            fill='none'
            cx= "350" 
            cy= "350"
            r= "350"
            strokeWidth="700"
            strokeDasharray={circumference}
            style={{animation: !done && time===0 ? "null" : `dash ${target}s linear infinite`,
                    visibility: done || time===0 ? 'hidden' : 'visible',
                    animationPlayState: pause ? "paused" : "running"}}
            />
          </ClockCircleWrapper>
          {time}
        </ClockWrapper>
        <button onClick={onClickStart}>시작 버튼</button>
        <button onClick={onClickPause}>정지 버튼</button>
      </div>
    </PC>

    <Mobile>
      <>
        <ClockWrapper>
          <ClockCircleWrapper time={time}>
          <circle cx="175" cy="175" r="175" fill={props.color} />
          <circle 
            className="inner_circle mobile"
            fill='none'
            cx= "175" 
            cy= "175"
            r= "175"
            strokeWidth="350"
            strokeDasharray={circumference}
            style={{animation: !done && time===0 ? "" : `dash ${target}s linear infinite`,
                    visibility: done || time===0 ? 'hidden' : 'visible',
                    animationPlayState: pause ? "paused" : "running",
          }}
            />
          </ClockCircleWrapper>
          {time}
        </ClockWrapper>
        <button onClick={onClickStart}>시작 ddd버튼</button>
        <button onClick={onClickPause}>정지 버튼</button>
      </>
    </Mobile>
  </>
  );
}

export default TimerClock;