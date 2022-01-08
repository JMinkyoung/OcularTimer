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
  display: felx;
  justify-content: center;
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
    <PageWrapper>
    {/* 여기서 redux를 통해서 저장된 타이머 정보를 가져올 예정 */}
      <span>{timerData[0].title}</span>
      <TimerClock target={timerData[0].time[0]} color={timerData[0].color}/>
    </PageWrapper>
  )
}

export default Home
