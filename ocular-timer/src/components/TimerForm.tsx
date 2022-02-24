import styled from 'styled-components';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";
import { HexColorPicker } from "react-colorful";
import { addTimer, editTimer } from '../modules/timer';
import { RootState } from '../modules';

interface Iprops {
  type: string;
  dataId?: number;
}

type TimerProps = {
  id: number;
  title: string;
  time: number;
  timesplit: number[];
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
    width: 150px;
    height: 70px;
    margin-top: 25px;
  }
`;

const TimeInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  @media ${(props) => props.theme.mobile} {
    width: 250px;
    height: 70px;
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

  @media ${(props) => props.theme.mobile} {
    margin: 10px 0 0 0;
    width: 150px;
  }
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
  @media ${(props) => props.theme.mobile} {
    font-size: 18px;
    margin: 0 5px 0 0;

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
  @media ${(props) => props.theme.mobile} {
    font-size: 18px;
  }
`;

const TimerForm = (props: Iprops) => {
  const [newid, setNewId] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newHour, setNewHour] = useState(0);
  const [newMin, setNewMin] = useState(0);
  const [newSec, setNewSec] = useState(0);
  const [color, setColor] = useState("#aabbcc");
  const dispatch = useDispatch();
  const router = useRouter();
  const timerData: TimerProps[] = useSelector((state: RootState) => state.timer);
  let data: TimerProps = timerData[0];
  const isMobile = useMediaQuery({
    query: "(max-width:767px)"
  });
  useEffect(()=>{
    if(props.type === "edit"){
      data = timerData.filter((v)=>v.id === props.dataId)[0];
      setNewId(data.id);
      setNewHour(data.timesplit[0]);
      setNewMin(data.timesplit[1]);
      setNewSec(data.timesplit[2]);
      setNewTitle(data.title);
      setColor(data.color);
    }
  },[]);
  const onChangeTitle = (e: any) => {
    setNewTitle(e.target.value);
  };

  const onChangeHour = (e: any) => {
    setNewHour(Number(e.target.value));
  }

  const onChangeMin = (e: any) => {
    setNewMin(Number(e.target.value));
  }

  const onChangeSec = (e: any) => {
    setNewSec(Number(e.target.value));
  }

  const onSave = (e: any) => {
    e.preventDefault();
    dispatch(addTimer({
      id: timerData.length === 0 ? 0 : timerData[timerData.length-1].id+1,
      title: newTitle,
      time: newHour*3600+newMin*60+newSec*1,
      timesplit:[newHour, newMin, newSec],
      color: color
    }));
    router.push('/timer');
  }

  const onEdit = (e: any) => {
    e.preventDefault();
      dispatch(editTimer({
        id: newid,
        title: newTitle,
        time: newHour*3600+newMin*60+newSec*1,
        timesplit:[newHour, newMin, newSec],
        color: color
      }));
      router.push('/timer');
  }
  const onCancel = () => {
    router.push('/timer');
  }
  return (
    <TimerFormContainer onSubmit={props.type==="edit"? onEdit : onSave} color={color}>
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
      <ColorInputContainer>
        <label>타이머 색상</label>
        <div style={{marginTop:'5px'}}>
        {isMobile ? <HexColorPicker style={{width:'auto', height: "100px"}} color={color} onChange={setColor}/>
        :           <HexColorPicker style={{width:'auto', height: "250px"}} color={color} onChange={setColor}/>}
        </div>
      </ColorInputContainer>
        <ButtonContainer>
          <PrimaryButton type="submit" onClick={props.type==='edit' ? onEdit : onSave}>{props.type==='edit' ? "수정" : "저장"}</PrimaryButton>
          <CancelButton type="button" onClick={onCancel}>취소</CancelButton>
        </ButtonContainer>
    </TimerFormContainer>
  );
};

export default TimerForm;