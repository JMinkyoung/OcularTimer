import styled from 'styled-components';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HexColorPicker } from "react-colorful";
import { addTimer } from '../modules/timer';
import { RootState } from '../modules';

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

const NewTimerFormContainer = styled.form<{color: string}>`
  width: 800px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content:center;
  flex-direction: column;
  background-color: ${(props)=>props.color};
  border-radius: 50%; 
  @media ${(props) => props.theme.tablet} {
    width: 700px;
    height: 700px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 380px;
    height: 380px;
  }
`;

const InputContainer = styled.div`
  display:flex;
  flex-direction: column;
  margin: 0px 0px 20px 0px;
  width: 80px;
`;

const TitleInputContainer = styled.div`
  width:250px;
  @media ${(props) => props.theme.mobile} {
    width: 200px;
    height: 100px;
  }
`;

const TimeInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  @media ${(props) => props.theme.mobile} {
    width: 200px;
    height: 100px;
  }
`;

const ColorInputContainer = styled.div`
  width: 250px;
  @media ${(props) => props.theme.mobile} {
    width: 150px;

  }
`;

const ButtonContainer = styled.div`
  display:flex;
  flex-direction:row;
  width: 250px;
  justify-content: center;
  margin: 20px 0 0 0;
`;

const PrimaryButton = styled.button`
  background-color: #3b88d5;
  color: #ecf0f4;
  width: 100px;
  height: 40px;
  margin: 0 10px 0 0;
  
  :hover{
    box-shadow:-100px 0 0 0 rgba(0,0,0,0.5) inset;
  }
`;

const CancelButton = styled.button`
  background-color: #ecf0f4;
  color: #3b88d5;
  width: 100px;
  height: 40px;

  :hover{
    box-shadow:-100px 0 0 0 rgba(0,0,0,0.5) inset;
  }
`;

// https://brunch.co.kr/@ebprux/56
const NewTimerForm = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState(0);
  const [color, setColor] = useState("#aabbcc");

  const dispatch = useDispatch();
  const router = useRouter();
  const timerData: TimerProps[] = useSelector((state: RootState) => state.timer);

  const onChangeTitle = (e: any) => {
    setNewTitle(e.target.value);
  };

  const onChangeHour = (e: any) => {
    setNewTime(newTime + (e.target.value*3600));
  }

  const onChangeMin = (e: any) => {
    setNewTime(newTime + (e.target.value*60));
  }

  const onChangeSec = (e: any) => {
    setNewTime(newTime+ (e.target.value*1));
  }

  const onSubmit = () => {
    dispatch(addTimer({
      id:timerData.length,
      title: newTitle,
      time: {"subtitle" : "", "time": newTime},
      color: color
    }));
    router.push('/timer');
  }
  return (
    <NewTimerFormContainer onSubmit={onSubmit} color={color}>
      <TitleInputContainer>
        <InputContainer style={{width:'100%'}}>
          <label style={{marginBottom:'5px'}}>타이틀</label>
          <input style={{width:'auto', height:'30px'}} onChange={onChangeTitle} value={newTitle}/>
        </InputContainer>
      </TitleInputContainer>
      <TimeInputContainer>
        <InputContainer>
          <label style={{marginBottom:'5px'}}>시간</label>
          <input onChange={onChangeHour} style={{height:'30px'}}/>
        </InputContainer>
        <InputContainer>
          <label style={{marginBottom:'5px'}}>분</label>
          <input onChange={onChangeMin} style={{height:'30px'}}/>
        </InputContainer>
        <InputContainer>
          <label style={{marginBottom:'5px'}}>초</label>
          <input onChange={onChangeSec} style={{height:'30px'}}/>          
        </InputContainer>
      </TimeInputContainer>
        {/* https://www.npmjs.com/package/react-colorful */}
      <ColorInputContainer>
        <label>타이머 색상</label>
        <div style={{marginTop:'5px'}}>
          <HexColorPicker style={{width:'auto'}} color={color} onChange={setColor}/>
        </div>
      </ColorInputContainer>
        <ButtonContainer>
          <PrimaryButton onClick={onSubmit}>저장</PrimaryButton>
          <CancelButton onClick={() => router.push('/timer')}>취소</CancelButton>
        </ButtonContainer>
    </NewTimerFormContainer>
  );
};

export default NewTimerForm;