import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Mobile, PC } from '../components/MediaQuery';
import { useMediaQuery } from "react-responsive";

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

type TimeDataType = {
  subtitle: string;
  time: number;
}

type TimerData = {
  id: number;
  title: string;
  time: TimeDataType[];
  color: string;
}

interface Iprops {
  timeData: TimerData;
}

const ClockWrapper = styled.div`
  width: 800px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content:center;
  flex-direction: column;

  @media ${(props) => props.theme.mobile} {
    width: 400px;
    height: 400px;
  }
`;

const ClockImgWrapper = styled.div`
  display: flex;
  margin: auto;
  margin-top: 0;
  width: 800px;
  height: 800px;

  @media ${(props) => props.theme.tablet} {
    width: 100%;
    height: auto;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: auto;
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

const ButtonWrapper = styled.div`
  display: flex;
`;

const TimerClock = (props: Iprops) => {
  const [time, setTime] = useState(0);
  const [timeIdx, setTimeIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [pause, setPause] = useState(false);
  const [started, setStarted] = useState(false);


  const isMobile = useMediaQuery({
    query: "(max-width:767px)"
  });

  const radius = isMobile ? 175 : 350;
  const circumference = 2 * Math.PI * radius;

  let target: number = props.timeData.time[timeIdx]["time"];
  const timeLen: number = props.timeData.time.length;

  useEffect(()=>{
    const interval = setInterval(()=> {
      if(!pause && started){
        setTime(prevTime => prevTime+1);
      }
    }, 1000);

    if(time === target && timeIdx !== timeLen-1){
      clearInterval(interval);
      setDone(true);
      setTime(0);
      setStarted(false);
      setTimeIdx(prevIndex => prevIndex+1);
    }else if(time === target && timeIdx === timeLen-1){
      clearInterval(interval);
      setDone(true);
      setTime(0);
      setStarted(false);
      setTimeIdx(0);
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
      <ClockWrapper>
        <ClockImgWrapper>
          <ClockCircleWrapper onClick={() => console.log("테스트")} time={time}>
            <circle cx="350" cy="350" r="350" fill={props.timeData.color} />
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
        </ClockImgWrapper>
        {target - time}초
        {props.timeData.time[timeIdx].subtitle}
        <ButtonWrapper>
          <button onClick={onClickStart}>시작 버튼</button>
          <button onClick={onClickPause}>정지 버튼</button>
        </ButtonWrapper>
      </ClockWrapper>
    </PC>

    <Mobile>
    <ClockWrapper>
        <ClockImgWrapper>
          <ClockCircleWrapper time={time}>
          <circle cx="175" cy="175" r="175" fill={props.timeData.color} />
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
        </ClockImgWrapper>
        {target - time}초        
        <ButtonWrapper>
          <button onClick={onClickStart}>시작 버튼</button>
          <button onClick={onClickPause}>정지 버튼</button>
        </ButtonWrapper>
      </ClockWrapper>
    </Mobile>
  </>
  );
}

export default TimerClock;