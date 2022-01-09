import type { NextPage } from 'next'
import React from 'react';
import TimerClock from '../components/TimerClock';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

const PageWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`;

const ClockComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  width: 100%;
  height: 100%;
`;

type TimeDataType = {
  subtitle: string;
  time: number;
}

type TimerProps = {
  id: number;
  title: string;
  time: TimeDataType[];
  color: string;
}


const Home: NextPage = () => {
  const timerData: TimerProps[] = useSelector((state: RootState) => state.timer);
  return (
    <PageWrapper>
    {/* 여기서 redux를 통해서 저장된 타이머 정보를 가져올 예정 */}
      <ClockComponentWrapper>
        <span style={{marginBottom: "20px", fontSize: "2rem"}}>{timerData[0].title}</span>
        {/* <span style={{marginBottom: "20px", fontSize: "1.3rem"}}>{timerData[0].time[0]["subtitle"]}</span> */}
        <TimerClock timeData={timerData[0]}/>

        <div style={{width: "300px", height: "20px", backgroundColor: "grey", marginTop: "50px"}}>여기에 음악 플레이어 들어감</div>
      </ClockComponentWrapper>
    </PageWrapper>
  )
}

export default Home
