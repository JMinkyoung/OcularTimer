import React from 'react';
import { useMediaQuery } from 'react-responsive';

type Props = {
  children: JSX.Element,
};

const Mobile = ({children}: Props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)"
  });
  return <>{isMobile && children}</>
}

const PC = ({children}: Props) => {
  const isPc = useMediaQuery({
    query: "(min-width:768px)"
  });
  return <>{isPc && children}</>
}

export {Mobile, PC};