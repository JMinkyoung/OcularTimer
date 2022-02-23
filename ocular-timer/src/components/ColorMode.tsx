import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { MdDarkMode, MdOutlineLightMode} from "react-icons/md";
import { RootState } from '../modules';
import React from 'react';
import { toggle } from '../modules/mode';

const ColorModeContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  height: 50px;
  font-size: 30px;
  padding: 10px;
  cursor: pointer;
`;

const ColorMode = () => {
  const dispatch = useDispatch();
  const mode: string = useSelector((state: RootState) => state.mode);
  const onClickToggle = (e: any) => {
    e.preventDefault();
    dispatch(toggle());
  }
  return (
    <ColorModeContainer>
    {mode === "light" ? <MdDarkMode onClick={onClickToggle} /> : <MdOutlineLightMode onClick={onClickToggle}/>}
    </ColorModeContainer>
  )
}

export default ColorMode;