import styled from 'styled-components';
import { useRouter } from 'next/router';
import { RiMenuFill, RiCloseFill, RiAddFill } from "react-icons/ri";
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
  time: TimeDataType[];
  color: string;
}

const NewTimerFormContainer = styled.form`
  width: 800px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content:center;
  flex-direction: column;
  border: 2px solid grey;
  background-color: grey;
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
      time: [{"subtitle" : "", "time": newTime}],
      color: color
    }));
    router.push('/timer');
  }
  return (
    <NewTimerFormContainer onSubmit={onSubmit}>
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
        <HexColorPicker style={{width:'auto'}} color={color} onChange={setColor}/>
      </ColorInputContainer>

        <div style={{display:'flex', flexDirection:'row'}}>
          <button onClick={onSubmit}>저장</button>
          <button>취소</button>
        </div>
    </NewTimerFormContainer>
  );
};

export default NewTimerForm;