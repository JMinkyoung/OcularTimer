import type { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
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
const edittimer: NextPage = () => {
  const router = useRouter();
  const mode: string = useSelector((state: RootState) => state.mode);

  return (
    <PageWrapper mode={mode}>
      <TimerForm type="edit" dataId={Number(router.query.id)}/>
    </PageWrapper>
  );
}

export default edittimer;