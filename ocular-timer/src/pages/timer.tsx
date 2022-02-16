import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react';
import TimerClock from '../components/TimerClock';
import NavigationBar from '../components/NavigationBar';
import TimerMenu from '../components/TimerMenu';

import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

const PageWrapper = styled.div`
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
  color: string;
}


const timer: NextPage = () => {
  const timerData: TimerProps[] = useSelector((state: RootState) => state.timer);
  const [titleClicked, setTitleClicked] = useState(false);
  const [selectedData, setSelectedData] = useState(timerData[0].id);
  const [currentData, setCurrentData] = useState(timerData[0]);
  const titleOnclick = () => {
    setTitleClicked(!titleClicked);
  }
  useEffect(()=>{
    setCurrentData(timerData.filter((v)=>v.id === selectedData)[0]);
  },[selectedData]);

  return (
    <PageWrapper>
    <NavigationBar timeData={timerData} setSelectedData={setSelectedData}/>
      <ClockComponentWrapper>
        <TimerTitle onClick={titleOnclick}>{currentData.title}
        <TimerMenu id={currentData.id} titleClicked={titleClicked}/>
        </TimerTitle>
        <TimerClock timeData={currentData}/>
      </ClockComponentWrapper>

    </PageWrapper>
  )
}

export default timer;
