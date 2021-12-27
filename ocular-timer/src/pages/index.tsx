import type { NextPage } from 'next'
import React from 'react';
import { Mobile, PC } from '../components/MediaQuery';
import TimerClock from '../components/TimerClock';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;

`;
const Home: NextPage = () => {
  const mobileTest: string = "모바일 메인페이지 테스트입니다.";
  const pcTest: string = "PC 메인페이지 테스트입니다.";

  return (
    <Wrapper>
    <TimerClock />
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
