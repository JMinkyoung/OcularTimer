import styled from 'styled-components';
import { useMediaQuery } from "react-responsive";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";
import React, {useState} from 'react';
interface Navigation {
  opened: boolean;
}

const MenuButtonContainer = styled.div`
  position: fixed;
  left: 0;
  z-index: 999;
  height: 100%;

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
  padding: 100px;
  margin: 0;
  padding-left: 1em;
  opacity: ${(props) => props.opened ? "1" : "0"};
  transition:0.5s ease-in-out;
  color: #F9F7F7;
`;

const ListItem = styled.li`
  width: 100px;
  list-style: none;
  margin-bottom: 0.8em;
  cursor: pointer;
  :hover{
    background-color:red;
  }
`;

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
    <MenuButtonContainer>
      {isOpen ? <RiCloseFill onClick={toggle} style={{padding:"10px 0 0 10px",fontSize: "30px", color: "#F9F7F7", cursor: 'pointer'}}/> : 
                  <RiMenuFill onClick={toggle} style={{padding:"10px 0 0 10px",fontSize: "30px", color: "#3F72AF", cursor: 'pointer'}}/>}
    </MenuButtonContainer>
    <NavigationContainer opened={isOpen}>
      <NaviMenuList opened={isOpen}>
        <ListItem>Mango</ListItem>
        <ListItem>Apple</ListItem>
        <ListItem>Oranges</ListItem>
      </NaviMenuList>
    </NavigationContainer>
    </>
  );
}

export default NavigationBar;