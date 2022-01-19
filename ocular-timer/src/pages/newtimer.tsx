import type { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import NewTimerForm from '../components/NewTimerForm';
import React from 'react';


const PageWrapper = styled.div`
  /* background-color: #121212; */
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  width: 100%;
  height: 100%;
`;
const newtimer: NextPage = () => {

  return (
    <PageWrapper>
      <NewTimerForm />
    </PageWrapper>
  );
}

export default newtimer