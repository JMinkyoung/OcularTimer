import type { NextPage } from 'next'
import React, {useState} from 'react';
import TimerClock from '../components/TimerClock';
import NavigationBar from '../components/NavigationBar';
import TimerMenu from '../components/TimerMenu';

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
  height: 850px;

  @media ${(props) => props.theme.mobile} {
    height: 500px;
  }
`;

const TimerTitle = styled.div`
  display: flex;
  margin-bottom: 5px;
  flex-direction: row;
  font-size: 2rem;
  cursor: pointer;
`;

const AudioWrapper = styled.div`
  width: 800px;

  @media ${(props) => props.theme.mobile} {
    width: 400px;
  }
`;

type TimeDataType = {
  subtitle: string;
  time: number;
}

type TimerProps = {
  id: number;
  title: string;
  time: TimeDataType;
  color: string;
}


const timer: NextPage = () => {
  const timerData: TimerProps[] = useSelector((state: RootState) => state.timer);
  const [titleClicked, setTitleClicked] = useState(false);
  const [selectedData, setSelectedData] = useState(0);

  const titleOnclick = () => {
    setTitleClicked(!titleClicked);
  }
  return (
    <PageWrapper>
    <NavigationBar timeData={timerData} setSelectedData={setSelectedData}/>
      <ClockComponentWrapper>
        <TimerTitle onClick={titleOnclick}>{timerData[selectedData].title}
        {titleClicked ? <TimerMenu/> : null}
        </TimerTitle>
        
        <TimerClock timeData={timerData[selectedData]}/>
      </ClockComponentWrapper>
      <AudioWrapper>
      <AudioPlayer autoPlay={false} loop src="/Book Bag.mp3" layout='horizontal' showJumpControls={false} style={{width: '100%'}} customProgressBarSection={
    [
      RHAP_UI.CURRENT_TIME,
      RHAP_UI.PROGRESS_BAR,
      RHAP_UI.CURRENT_LEFT_TIME,
    ]
}/>
      </AudioWrapper>

    
    </PageWrapper>
  )
}

export default timer;
