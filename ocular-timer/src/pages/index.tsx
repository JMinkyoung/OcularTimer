import type { NextPage } from 'next'
import React from 'react';
import TimerClock from '../components/TimerClock';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;

`;

type TimerProps = {
  id: number;
  title: string;
  time: number[];
  color: string;
}


const Home: NextPage = () => {
  const timerData: TimerProps[] = useSelector((state: RootState) => state.timer);
  return (
    <Wrapper>
    {/* 여기서 redux를 통해서 저장된 타이머 정보를 가져올 예정 */}
    <span>{timerData[0].title}</span>
    <TimerClock target={timerData[0].time[0]} color={timerData[0].color}/>
      {/* <Mobile>
        <div style={{color:"red"}}>
          <h1>{mobileTest}</h1>
        </div>
      </Mobile>

      <PC>
        <div style={{color:"blue"}}>
          <h1>{pcTest}</h1>
          <TimerClock/>
        </div>
      </PC> */}
    </Wrapper>
  )
}

export default Home
