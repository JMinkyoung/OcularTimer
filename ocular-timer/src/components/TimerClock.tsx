import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useMediaQuery } from "react-responsive";

interface ClockCircleSvg {
  time: number;
  targetTime: number;
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
  title: string;
  time: TimeDataType;
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
  /* margin: auto; */
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
  animation: ${(props)=> (!props.done && props.time===props.targetTime) ? null : `dash ${props.targetTime}s linear infinite`};
  visibility: ${(props)=> props.done || props.time===props.targetTime ? 'hidden' : 'visible'};
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

const TimeInfoWrapper = styled.div<{started: boolean}>`
  display: flex;
  visibility:  ${(props)=> props.started ? 'hidden' : 'visible'};
  flex-direction: column;
  align-items: center;
  margin: 5px 0 5px 0;
`;

const TimerClock = (props: Iprops) => {
  
  const [done, setDone] = useState(false);  // 끝났는지 확인
  const [pause, setPause] = useState(false);  // 일시정지
  const [started, setStarted] = useState(false);  // 시작했는지 확인
  const [radius, setRadius] = useState(350);  // 반지름
  const [circumference, setCircumference] = useState(2199); // 원주
  const [className, setClassName] = useState("inner_circle pc");  // 반응형 웹 클래스 name
  let target: number = props.timeData.time["time"];
  const [time, setTime] = useState(target);  // 현재 시간

  const isMobile = useMediaQuery({
    query: "(max-width:767px)"
  });
  
  // 메뉴 바뀔때마다 실행 (전부 초기화)
  useEffect(()=>{
    setTime(props.timeData.time["time"]);
    setDone(false);
    setPause(false);
    setStarted(false);
  },[props.timeData]);

  // 반응형 웹
  useEffect(()=>{
    if(isMobile){
      setRadius(175);
      setCircumference(1099);
      setClassName("inner_circle mobile");
    }else{
      setRadius(350);
      setCircumference(2199);
      setClassName("inner_circle pc");

    }
  },[isMobile]);

  // 리렌더링 될 때 마다 실행 
  useEffect(()=>{
    const interval = setInterval(()=> {
      if(!pause && started){
        setTime(prevTime => prevTime-1);
      }
    }, 1000);

    if(time === 0){ // 다음 타입이 없고 끝났을 때
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

  const onClickTimer = () => {
    if(pause || !started){
      setPause(false);
      setStarted(true);
      setDone(false);
    }else{
      setPause(true);
    }
  }

  return (
    <>
        <ClockWrapper>
          <ClockImgWrapper>
            <ClockCircleWrapper targetTime={target} time={time} style={{cursor: 'pointer'}} onClick={onClickTimer}>
              <circle cx={radius} cy={radius} r={radius} fill={props.timeData.color}/>
              <circle 
              className={className}
              fill='none'
              cx= {radius} 
              cy= {radius}
              r= {radius}
              strokeWidth={radius*2}
              strokeDasharray={circumference}
              style={{animation: !done && time===target ? "null" : `dash ${target}s linear infinite`,
                      visibility: done || time===target ? 'hidden' : 'visible',
                      animationPlayState: pause ? "paused" : "running"}}
              />
            </ClockCircleWrapper>
          </ClockImgWrapper>
          <TimeInfoWrapper started={started}>            
            <div style={{display:'flex', flexDirection:'row'}}>              
              {Math.floor((target)/60/60) === 0 ? null : <span>{Math.floor((target)/60/60)}시간</span>}
              {target - Math.floor((target)/60/60)*60*60 === 0 ? null : <span>{Math.floor((target - Math.floor((target)/60/60)*60*60)/60)}분</span>}
              {target - Math.floor((target)/60/60)*60*60 - Math.floor((target - Math.floor((target)/60/60)*60*60)/60)*60 === 0 ? null : 
              <span>
                {target - (Math.floor((target)/60/60)*60*60)-(Math.floor((target - Math.floor((target)/60/60)*60*60)/60)*60)}초
              </span>}
            </div>
          </TimeInfoWrapper>
          <ButtonWrapper>
            <button onClick={onClickStart}>START</button>
            <button onClick={onClickPause}>STOP</button>
          </ButtonWrapper>
        </ClockWrapper>
    </>
    );
  }

export default TimerClock;