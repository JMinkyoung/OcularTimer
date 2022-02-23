import type { NextPage } from 'next';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import TimerForm from '../components/TimerForm';
import React from 'react';


const PageWrapper = styled.div<{mode: string}>`
  background-color:${props => props.mode === "light" ? "#F8F7F4" : "#1E1E22"};
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  width: 100%;
  height: 100%;
`;
const newtimer: NextPage = () => {
  const mode: string = useSelector((state: RootState) => state.mode);

  return (
    <PageWrapper mode={mode}>
      <TimerForm type="add"/>
    </PageWrapper>
  );
}

export default newtimer;