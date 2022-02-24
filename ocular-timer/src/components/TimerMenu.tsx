import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import React from 'react';
import { BiTrash,BiEdit } from 'react-icons/bi';
import {deleteTimer} from '../modules/timer';
import Router from 'next/router';

interface Iprops {
  id: number;
  titleClicked: boolean;
}

const ButtonContainer = styled.div<{shown: boolean}>`
  display: flex;
  visibility: ${(props)=>props.shown ? 'visible' : 'hidden'};
  opacity: ${(props)=>props.shown ? 1 : 0};
  transition: 0.2s ease-in-out;
  width: 100px;
  justify-content: center;
  align-items: center;
`;

const TimerMenu = (props: Iprops) => {
  const dispatch = useDispatch();
  const onClickdeleteTimer = () => {
    dispatch(deleteTimer(props.id));
  };

  const onClickeditTimer = () => {
    Router.push({
      pathname: '/edittimer',
      query: {id:props.id}
    });
  };

  return(
    <ButtonContainer shown={props.titleClicked}>
      <BiEdit onClick={onClickeditTimer} style={{marginRight: '9px', fontSize: '2rem'}}/>
      <BiTrash onClick={onClickdeleteTimer} style={{marginRight: '9px', fontSize: '2rem'}} color="red"/>
    </ButtonContainer>
  )
}

export default TimerMenu;