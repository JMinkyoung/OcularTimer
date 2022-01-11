import type { NextPage } from 'next'
import React from 'react';
import TimerClock from '../components/TimerClock';
import AudioPlayer,{ RHAP_UI }  from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; 
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

const PageWrapper = styled.div`
  /* background-color: #121212; */
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  width: 100%;
  height: 100%;
`;

const ClockComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  width: 100%;
  margin-top:20px;
  height: auto;
`;

const TimerTitle = styled.span`
  margin-bottom: 20px;
  font-size: 2rem;
  cursor: pointer;
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


const timer: NextPage = () => {
  const timerData: TimerProps[] = useSelector((state: RootState) => state.timer);
  return (
    <PageWrapper>
    {/* 여기서 redux를 통해서 저장된 타이머 정보를 가져올 예정 */}
      <ClockComponentWrapper>
        <TimerTitle>{timerData[1].title}</TimerTitle>
        <TimerClock timeData={timerData[1]}/>
      </ClockComponentWrapper>

      <AudioPlayer autoPlay={false} loop src="/Book Bag.mp3" layout='horizontal' showJumpControls={false} style={{width: '400px'}} customProgressBarSection={
    [
      RHAP_UI.CURRENT_TIME,
      RHAP_UI.PROGRESS_BAR,
      RHAP_UI.CURRENT_LEFT_TIME,
    ]
  }/>
    
    </PageWrapper>
  )
}

export default timer;
