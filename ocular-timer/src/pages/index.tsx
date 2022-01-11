import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <h1>메인페이지</h1>
      <button onClick={()=>router.push('/timer')}>타이머 페이지로 이동</button>
    </>
  );
}

export default Home
