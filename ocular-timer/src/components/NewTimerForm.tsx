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

  @media ${(props) => props.theme.mobile} {
    width: 400px;
    height: 400px;
  }
`;
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
        {/* <label>타이틀</label>
        <input onChange={onChangeTitle} value={newTitle}/> */}
        <label htmlFor="inp" className="inp">
          <input type="text" id="inp" placeholder="&nbsp;"/>
          <span className="label">타이틀</span>
          <span className="focus-bg"></span>
        </label>
        <div style={{display:'flex', flexDirection:'row'}}>
          <input onChange={onChangeHour} style={{width:'50px'}}/>시간
          <input onChange={onChangeMin} style={{width:'50px'}}/>분
          <input onChange={onChangeSec} style={{width:'50px'}}/>초
        </div>
        {/* https://www.npmjs.com/package/react-colorful */}
        <HexColorPicker color={color} onChange={setColor}/> 
        <div style={{display:'flex', flexDirection:'row'}}>
          <button onClick={onSubmit}>저장</button>
          <button>취소</button>
        </div>
    </NewTimerFormContainer>
  );
};

export default NewTimerForm;