import StockDetailInfo from "../types/StockDetailInfo";
import styled from 'styled-components';
import React from "react";
import {useEffect} from "react";


interface Props{
    isOpen : boolean;
}




export default function MarketStatusBox ({isOpen}:Props){

    const text = isOpen ? "OPEN" : "CLOSED";


    return (
        <TextBox isOpen>
            <TagText isOpen>{text}</TagText>
        </TextBox>
    );
}

const TextBox = styled.div<Props>`
  
  display: inline-block;
  
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  
  padding:3px;
  
  justify-items: center;


  background-color: ${props => (props.isOpen ? "#FEF0EB": "#E9F3FF")};
  border-color: ${props => (props.isOpen ? "#F56C3B": "#83BBF8")};

`;

const TagText = styled.text<Props>`
  
  font-family: Pretendard;
  font-weight: 400;
  padding-left: 3px;
  padding-right: 3px;
  font-size: 1.5vh;

  
  color: ${props => (props.isOpen ? "#F56C3B": "#83BBF8")};
  

`;

