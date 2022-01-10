import type { NextPage } from 'next'
import React from 'react';
import TimerClock from '../components/TimerClock';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; 
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
  margin-top:50px;
  height: auto;
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
        <TimerClock timeData={timerData[0]}/>
      </ClockComponentWrapper>
      <AudioPlayer autoPlay={false} loop src="/Book Bag.mp3"/>

    </PageWrapper>
  )
}

export default Home
