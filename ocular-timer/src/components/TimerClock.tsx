import React, {useEffect, useState, useRef} from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

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

const ClockCircleWrapper = styled.svg<{time: number, color: string}>`
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

const ClockCircle = styled.circle<{time: number, done: boolean, radius: number, circumference: number}>`
  fill: none;
  stroke: #ffff;
  cx: 350;
  cy: 350;
  r: 150;
  stroke-width: 300;
  stroke-dasharray: ${(props)=>props.circumference};
  animation: ${(props)=> props.done ? null : `dash ${props.time}s linear infinite`};
  visibility: ${(props)=> props.done ? 'hidden' : 'visible'};

  @keyframes dash {
    from{
      stroke-dashoffset: ${(props)=>props.circumference};
    }
    to {
      stroke-dashoffset:0;
    }
  }
`;




const TimerClock = () => {
  const [time, setTime] = useState(0);
  const [done, setDone] = useState(false);
  const target: number = 60;
  const timeRef:any = useRef();
  const radius = 150;
  const circumference = 2 * Math.PI * radius;

  useEffect(()=>{
    const tick = () => {
      setTime(prevTime => prevTime+1);
    }
    timeRef.current = setInterval(()=> tick(), 1000); 
  },[]);

  useEffect(()=>{
    if(time === target){
      clearInterval(timeRef.current);
      setDone(true);
    }
  });

  return (
    <ClockWrapper>
    <ClockCircleWrapper time={time} color={"22577E"}>
      <circle cx="350" cy="350" r="299" fill="#22577E" />
      <ClockCircle time={target} done={done} radius={radius} circumference={circumference} />
    </ClockCircleWrapper>
    </ClockWrapper>
  );
}

export default TimerClock;