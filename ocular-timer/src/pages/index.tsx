import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import InfiniteSlider from '../components/InfiniteSlider';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color:#F8F7F4;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
`;

const MainTitle = styled.h1`
  font-size: 50px;
  margin-bottom: 20px;
  @media ${(props) => props.theme.mobile} {
    font-size: 40px;
    margin-bottom: 5px;
  }
`;

const StartButton = styled.button`
  background-color: #2C4373;
  color: #ecf0f4;
  width: 100px;
  height: 40px;
  margin: 0 10px 0 0;
  :hover{
    box-shadow:-100px 0 0 0 rgba(0,0,0,0.5) inset;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: 25px;
    margin: 0 5px 0 0;
  }
`;


const Home: NextPage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width:767px)"
  });

  return (
    <PageWrapper>
      <MainTitle>OCT ⏱</MainTitle>
      <InfiniteSlider type={isMobile ? "mobile" : "pc"}/>
      <StartButton onClick={()=>router.push('/timer')}>시작</StartButton>
    </PageWrapper>
  );
}

export default Home
