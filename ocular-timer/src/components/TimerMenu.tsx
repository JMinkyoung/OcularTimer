import styled from 'styled-components';
import { useRouter } from 'next/router';
import React, {SetStateAction, useState} from 'react';

const TimerMenu = () => {
  return(
    <div>
      <button onClick={()=>console.log('수정')}>Edit</button>
      <button onClick={()=>console.log('삭제')}>Delete</button>
    </div>
  )
}

export default TimerMenu;