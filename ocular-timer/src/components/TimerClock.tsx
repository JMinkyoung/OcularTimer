import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import { Mobile, PC } from '../components/MediaQuery';

interface ClockCircleSvg {
  time: number;
}

interface ClockCircle {
  time: number;
  targetTime: number;
  done: boolean;
  circumference: number;
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
    margin-top: 50%;
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
  r: 150;
  stroke-width: 300;
  stroke-dasharray: ${(props)=>props.circumference};
  animation: ${(props)=> (!props.done && props.time===0) ? null : `dash ${props.targetTime}s linear infinite`};
  visibility: ${(props)=> props.done || props.time===0 ? 'hidden' : 'visible'};

  @keyframes dash {
    from{
      stroke-dashoffset: ${(props)=>props.circumference};
    }
    to {
      stroke-dashoffset:0;
    }
  }

  @media ${(props) => props.theme.mobile} {
    cx: 125;
    cy: 125;
    r: 75;
    stroke-width: 100;
  }
`;

const TimerClock = (props: Iprops) => {
  const [time, setTime] = useState(0);
  const [done, setDone] = useState(false);

  const timeRef:any = useRef();
  const radius = 150;
  // pc 화면에선 150
  const circumference = 2 * Math.PI * radius;
 
  const target: number = props.target;

  const tick = () => {
    setTime(prevTime => prevTime+1);
  }

  const onClickButton = () => {
    timeRef.current = setInterval(()=> tick(), 1000); 
  }

  useEffect(()=>{
    if(time === target){
      clearInterval(timeRef.current);
      setDone(true);
      setTime(0);
    }
  });

  return (
    <ClockWrapper>
    <ClockCircleWrapper time={time}>
      <circle cx="350" cy="350" r="299" fill={props.color} />

    <ClockCircle time={time} targetTime={target} done={done}circumference={circumference} />
    </ClockCircleWrapper>
    {time}
    <button onClick={onClickButton}>시작 버튼</button>
    </ClockWrapper>
  );
}

export default TimerClock;