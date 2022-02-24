import React, { useState } from 'react';
import styled from 'styled-components';

interface Iprops {
  type: string;
}

const Container = styled.div`
`;
const SliderWrapper = styled.div`
  position: relative;
  width: 1000px;
  margin: auto;
  padding-bottom: 30px;
  @media ${(props) => props.theme.mobile} {
    width: 350px;
  }
`;
const SliderList = styled.div`
  width: 4000px;
  @media ${(props) => props.theme.mobile} {
    width: 1400px;
  }
`;
const SliderBox = styled.div`
  width: 100%;
  margin: auto;
  overflow-x: hidden;
`;
const SliderContent = styled.div`
  // pc : 1000px, mobile : 350px;
  display: table;
  float: left;
  width: 1000px;
  height: auto;
  @media ${(props) => props.theme.mobile} {
    width: 350px;
    height: auto;
  }
`;
const InfiniteSlider = (props: Iprops) => {
  const [curIdx, setCurIdx] = useState(0);
  const slideWidth: number = props.type==="pc" ? 1000 : 350;
  const transitionSeppd = 500;
  const transitionStyle = `transform ${transitionSeppd}ms ease 0s`;

  const rednering = () => {
    const result = [];
    if(props.type==="pc"){
      for(let i: number = 1; i<5; i++){
        result.push(<SliderContent><img key={i} style={{width:"100%"}}src={`/img/pcex${i}.JPG`}/></SliderContent>);
      }
    }else{
      for(let i: number = 1; i<5; i++){
        result.push(<SliderContent><img key={i} src={`/img/mbex${i}.JPG`}/></SliderContent>);
      }
    }
    return result;
  };

  const onClickNext = (e: any) => {
    e.preventDefault();
    if(curIdx < 4){
      setCurIdx(prev => prev+1);
    }
  }

  const onClickPrev = (e: any) => {
    e.preventDefault();
    if(curIdx < 4){
      setCurIdx(prev => prev-1);
    }
  }

  console.log(curIdx);
  return (
    <Container>
      <SliderWrapper>
        <SliderBox>
          <SliderList style={{transform: `translateX(${(-slideWidth * curIdx)}px)`,transition: transitionStyle}}>
            {rednering()}
          </SliderList>
        </SliderBox>
        <button onClick={onClickPrev}>prev</button>
        <button onClick={onClickNext}>next</button> 
      </SliderWrapper>
    </Container>
  );
}

export default InfiniteSlider;