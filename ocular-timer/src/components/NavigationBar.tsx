import styled from 'styled-components';
import { useRouter } from 'next/router';
import { RiMenuFill, RiCloseFill, RiAddFill } from "react-icons/ri";
import React, {useState} from 'react';

interface Navigation {
  opened: boolean;
}

type TimerData = {
  id: number;
  title: string;
  time: number;
  color: string;
}

interface Iprops {
  timeData: TimerData[];
  setSelectedData: React.Dispatch<React.SetStateAction<number>>;
}

const MenuButtonContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 50px;
`;

const NavigationContainer = styled.div<Navigation>`
  width: ${(props) => props.opened ? "150px" : "0px"};
  visibility: ${(props) => props.opened ? "visible" : "hidden"};
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 800;
  transition:0.5s ease-in-out;
  background-color: ${(props) => props.opened ? "#112D4E" : "transparent"};
  border-radius: 0px 15px 15px 0px;
`;

const NaviMenuList = styled.ul<{opened: boolean}>`
  width: 150px;
  padding: 60px 0px 0px 15px;
  opacity: ${(props) => props.opened ? "1" : "0"};
  transition:0.5s ease-in-out;
  color: #F9F7F7;
`;

const ListItem = styled.li`
  clear:both;
  float:left;
  list-style: none;
  margin-bottom: 0.8em;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  :after{
    display: block;
    content: '';
    border-bottom: solid 3px #3286E6;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }

  :hover:after{
    transform: scaleX(1);
  }
`;

const CloseButton = styled(RiCloseFill)`
  padding: 10px 0 0 10px ;
  font-size:  30px ;
  color:  #F9F7F7 ;
  cursor: pointer ;
  transition: all 0.3s ease-in-out;

  :hover{
    color: #3286E6;
  }
`;

const AddButton = styled(RiAddFill)`
  width:30px;
  font-size: 30px;
  margin:10px 0 0 60px;
  cursor: pointer;
  color: #F9F7F7;
  transition: all 0.3s ease-in-out;

  :hover{
    color: #3286E6;
  }
`;

const NavigationBar = (props: Iprops) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const router = useRouter();
  const onClickMenu = (num: number) => {
    props.setSelectedData(num);
  };
  return (
    <>
    <MenuButtonContainer>
      {isOpen ? <><CloseButton onClick={toggle}/>
                  <AddButton onClick={()=>router.push('/newtimer')}/> </> : 
                  <RiMenuFill onClick={toggle} style={{padding:"10px 0 0 10px",fontSize: "30px", color: "#3F72AF", cursor: 'pointer'}}/>}
    </MenuButtonContainer>
    <NavigationContainer opened={isOpen}>
      <NaviMenuList opened={isOpen}>
        {props.timeData.map((v)=>{
          return <ListItem onClick={() => onClickMenu(v.id)} key={v.id}>{v.title}</ListItem>
        })}
      </NaviMenuList>
    </NavigationContainer>
    </>
  );
}

export default NavigationBar;