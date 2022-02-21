import styled from 'styled-components';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HexColorPicker } from "react-colorful";
import { addTimer } from '../modules/timer';
import { RootState } from '../modules';

interface Iprops {
  type: string;
  dataId?: number;
}

type TimerProps = {
  id: number;
  title: string;
  time: number;
  color: string;
}

const TimerFormContainer = styled.form<{color: string}>`
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
const TimerForm = (props: Iprops) => {
  const [newTitle, setNewTitle] = useState("");
  const [newHour, setNewHour] = useState(0);
  const [newMin, setNewMin] = useState(0);
  const [newSec, setNewSec] = useState(0);
  const [color, setColor] = useState("#aabbcc");

  const dispatch = useDispatch();
  const router = useRouter();
  const timerData: TimerProps[] = useSelector((state: RootState) => state.timer);

  useEffect(()=>{
    if(props.type === "edit"){
      let data = timerData.filter((v)=>v.id === props.dataId);
      setNewTitle(data[0].title);
      setNewHour(Math.floor((data[0].time%(60*60*24))/(60*60)));
      setNewMin(Math.floor((data[0].time%(60*60))/60));
      setNewSec(data[0].time%60);
      setColor(data[0].color);
    }
  },[]);
  const onChangeTitle = (e: any) => {
    setNewTitle(e.target.value);
  };

  const onChangeHour = (e: any) => {
    setNewHour(e.target.value*3600);
  }

  const onChangeMin = (e: any) => {
    setNewMin(e.target.value*60);
  }

  const onChangeSec = (e: any) => {
    setNewSec(e.target.value*1);
  }

  const onSubmit = () => {
    dispatch(addTimer({
      id: timerData.length === 0 ? 0 : timerData[timerData.length-1].id+1,
      title: newTitle,
      time: newHour+newMin+newSec,
      color: color
    }));
    router.push('/timer');
    console.log("이건 새로 생성");
  }

  const onEdit = () => {

    // 수정 redux action 수정해야함
    // dispatch(addTimer({
    //   id: timerData.length === 0 ? 0 : timerData[timerData.length-1].id+1,
    //   title: newTitle,
    //   time: newHour+newMin+newSec,
    //   color: color
    // }));
    router.push('/timer');
  }

  const onCancel = () => {
    router.push('/timer');
  }
  return (
    <TimerFormContainer onSubmit={props.type==="edit"? onEdit : onSubmit} color={color}>
      <TitleInputContainer>
        <InputContainer style={{width:'100%'}}>
          <label style={{marginBottom:'5px'}}>타이틀</label>
          <input style={{width:'auto', height:'30px'}} onChange={onChangeTitle} value={newTitle}/>
        </InputContainer>
      </TitleInputContainer>
      <TimeInputContainer>
        <InputContainer>
          <label style={{marginBottom:'5px'}}>시간</label>
          <input onChange={onChangeHour} style={{height:'30px'}} value={newHour}/>
        </InputContainer>
        <InputContainer>
          <label style={{marginBottom:'5px'}}>분</label>
          <input onChange={onChangeMin} style={{height:'30px' }} value={newMin}/>
        </InputContainer>
        <InputContainer>
          <label style={{marginBottom:'5px'}}>초</label>
          <input onChange={onChangeSec} style={{height:'30px'}} value={newSec}/>          
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
          {props.type === "edit" ? <PrimaryButton onClick={()=>console.log("수정")}>수정</PrimaryButton> : <PrimaryButton onClick={onSubmit}>저장</PrimaryButton>}
          <CancelButton onClick={onCancel}>취소</CancelButton>
        </ButtonContainer>
    </TimerFormContainer>
  );
};

export default TimerForm;