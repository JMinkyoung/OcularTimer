import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react';
import TimerClock from '../components/TimerClock';
import NavigationBar from '../components/NavigationBar';
import ColorMode from '../components/ColorMode';
import TimerMenu from '../components/TimerMenu';

import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

const PageWrapper = styled.div<{mode: string}>`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  background-color:${props => props.mode === "light" ? "#F8F7F4" : "#1E1E22"};
  color: ${props => props.mode === "light" ? "#31302E" : "#ccc"};
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
  padding-left: 100px;
  flex-direction: row;
  font-size: 2rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media ${(props) => props.theme.mobile} {
    margin-bottom: 20px;
  }
`;

type TimerProps = {
  id: number;
  title: string;
  time: number;
  timesplit: number[];
  color: string;
}


const timer: NextPage = () => {
  const timerData: TimerProps[] = useSelector((state: RootState) => state.timer);
  const mode: string = useSelector((state: RootState) => state.mode);
  
  const [titleClicked, setTitleClicked] = useState(false);
  const [selectedData, setSelectedData] = useState(timerData.length !== 0 ? timerData[0].id : 0);
  const [currentData, setCurrentData] = useState(timerData[0] || null);

  const titleOnclick = () => {
    setTitleClicked(!titleClicked);
  }
  useEffect(()=>{
    setCurrentData(timerData.filter((v)=>v.id === selectedData)[0]);
  },[selectedData]);

  useEffect(()=>{
    if(timerData.length !==0){
      setTitleClicked(false);
      setSelectedData(timerData[0].id);
      setCurrentData(timerData[0]);
    }
  },[timerData]);
  return (
    <PageWrapper mode={mode}>
    <NavigationBar timeData={timerData} setSelectedData={setSelectedData}/>
    <ColorMode />
    {timerData.length === 0 ? null :
          <ClockComponentWrapper>
          <TimerTitle onClick={titleOnclick}>{currentData.title}
          <TimerMenu id={currentData.id} titleClicked={titleClicked}/>
          </TimerTitle>
          <TimerClock timeData={currentData}/>
        </ClockComponentWrapper>}
    </PageWrapper>
  )
}

export default timer;
