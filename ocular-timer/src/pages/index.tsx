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
  @media ${(props) => props.theme.mobile} {
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
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
      {/* {isMobile ? <ImageContainer>
                    <img style={{width: '50%'}} src={'/img/mbex.JPG'}/>
                    <img style={{width: '50%'}} src={'/img/mbex2.JPG'}/>
                  </ImageContainer> : 
                  <ImageContainer>
                    <img style={{width: '50%'}} src={'/img/pcex.JPG'}/>
                    <img style={{width: '50%'}} src={'/img/pcex2.JPG'}/>
                  </ImageContainer>} */}
      <button onClick={()=>router.push('/timer')}>타이머 페이지로 이동</button>
    </PageWrapper>
  );
}

export default Home
