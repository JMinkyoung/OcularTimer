import type { NextPage } from 'next'

const Home: NextPage = () => {
  const test: string = "메인페이지 테스트입니다.";
  return (
    <h1>{test}</h1>
  )
}

export default Home
