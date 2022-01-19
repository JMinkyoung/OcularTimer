import styled from 'styled-components';
import { useRouter } from 'next/router';
import { RiMenuFill, RiCloseFill, RiAddFill } from "react-icons/ri";
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HexColorPicker } from "react-colorful";

const NewTimerFormContainer = styled.div`
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

  const onChangeTitle = (e: any) => {
    setNewTitle(e.target.value);
};
  return (
    <NewTimerFormContainer>
      <form>
        <input onChange={onChangeTitle} value={newTitle}/>
        <div style={{display:'flex', flexDirection:'row'}}>
          <input style={{width:'50px'}}/>시간
          <input style={{width:'50px'}}/>분
          <input style={{width:'50px'}}/>초
        </div>
        {/* https://www.npmjs.com/package/react-colorful */}
        <HexColorPicker color={color} onChange={setColor}/> 
        <div style={{display:'flex', flexDirection:'row'}}>
          <button>저장</button>
          <button>취소</button>
        </div>
      </form>
    </NewTimerFormContainer>
  );
};

export default NewTimerForm;