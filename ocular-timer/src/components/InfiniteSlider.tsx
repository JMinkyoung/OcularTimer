import React, { useState, useEffect , useRef} from 'react';
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
  width: 6000px;
  @media ${(props) => props.theme.mobile} {
    width: 2100px;
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
  const [transition, setTransition] = useState("");

  const slideWidth: number = props.type==="pc" ? 1000 : 350;
  const transitionSpeed = 500;
  const transitionStyle = `transform ${transitionSpeed}ms ease 0s`;

  const rednering = () => {
    const result = [];
    if(props.type==="pc"){
      result.push(<SliderContent><img key={-1} style={{width:"100%"}}src={`/img/pcex4.JPG`}/></SliderContent>)
      for(let i: number = 1; i<5; i++){
        result.push(<SliderContent><img key={i} style={{width:"100%"}}src={`/img/pcex${i}.JPG`}/></SliderContent>);
      }
      result.push(<SliderContent><img key={5} style={{width:"100%"}}src={`/img/pcex1.JPG`}/></SliderContent>)
    }else{
      for(let i: number = 1; i<5; i++){
        result.push(<SliderContent><img key={i} src={`/img/mbex${i}.JPG`}/></SliderContent>);
      }
    }
    return result;
  };

  // useEffect(()=>{
  //   const interval = setInterval(()=>{
  //     console.log("dd")
  //     if(curIdx <= 3){
  //       setCurIdx(prev => prev+1);
  //       setTransition(transitionStyle);
  //     }
  //     if(curIdx === 3){
  //       setTimeout(()=>{
  //         setTransition("");
  //         setCurIdx(0);
  //       },transitionSpeed);
  //       setTransition(transitionStyle);
  //     }
  //   },3000);
  //   return () => {
  //     clearInterval(interval);
  //   }
  // },[curIdx]);
  // useEffect(()=>{
  //   setTransition(transitionStyle);
  //   setInterval(()=>{
  //     onClickNext();
  //   },3000);
  //   return clearInterval();
  // },[])

  const onClickNext = () => {
    console.log(curIdx, transition)
    if(curIdx <= 3){
      setCurIdx(prev => prev+1);
      setTransition(transitionStyle);
    }
    if(curIdx === 3){
      setTimeout(()=>{
        setTransition("");
        setCurIdx(0);
      },transitionSpeed);
    }
  }

  const onClickPrev = (e: any) => {
    e.preventDefault();
    if(curIdx >= 0){
      setCurIdx(prev => prev-1);
      setTransition(transitionStyle);
    }
    if(curIdx === 0){
      setTimeout(()=>{
        setTransition("");
        setCurIdx(3);
      },transitionSpeed);
    }
  }

  return (
    <Container>
      <SliderWrapper>
        <SliderBox>
          <SliderList style={{transform: `translateX(${(-slideWidth * (curIdx+1))}px)`,transition: transition}}>
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