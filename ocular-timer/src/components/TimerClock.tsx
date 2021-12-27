import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

const ClockWrapper = styled.div`
  display: flex;
  margin: auto;
  margin-top: 3%;
  width: 800px;
  height: 800px;

  @media ${(props) => props.theme.tablet} {
    width: 100%;
    height: auto;
    margin-top: 15%;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: auto;
    margin-top: 50%;
  }
`;

const ClockCircle = styled.div`
  position: relative;
  width: 700px;
  height: 700px;
  margin: auto;
  background: white;

  // 오른쪽
  background-image: linear-gradient(90deg, transparent 50%, #22577E 50%), linear-gradient(90deg, #22577E 50%, transparent 50%);
  /* background-image: linear-gradient(135deg, transparent 50%, #22577E 50%), linear-gradient(90deg, #22577E 50%, transparent 50%); */
  /* background-image: linear-gradient(180deg, transparent 50%, #22577E 50%), linear-gradient(90deg, #22577E 50%, transparent 50%); */
  /* background-image: linear-gradient(90deg, #22577E 50%, transparent 50%);  */


  // 왼쪽
  /* background-image: linear-gradient(90deg, transparent 50%, white 50%), linear-gradient(90deg, #22577E 50%, transparent 50%); */
  /* background-image: linear-gradient(135deg, transparent 50%, white 50%), linear-gradient(90deg, #22577E 50%, transparent 50%); */
  /* background-image: linear-gradient(180deg, transparent 50%, white 50%), linear-gradient(90deg, #22577E 50%, transparent 50%); */


  border-radius: 100%;
  @media ${(props) => props.theme.mobile} {
    width: 350px;
    height: 350px;
  }
`;




const TimerClock = () => {
  return (
    <ClockWrapper>
      
    <ClockCircle/>
    </ClockWrapper>
  );
}

export default TimerClock;