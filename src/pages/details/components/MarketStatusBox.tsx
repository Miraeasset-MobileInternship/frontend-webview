import StockDetailTypes from "../../../types/StockDetailTypes";
import styled, {css} from 'styled-components';
import React from "react";
import {useEffect} from "react";


interface Props{
    isOpen? : boolean;
}




export default function MarketStatusBox ({isOpen}:Props){

    const text = isOpen ? "OPEN" : "CLOSED";
    const backgroundColor = isOpen ? '#F56C3B': '#83BBF8';

    return (
        <TextBox isOpen>
            <TagText isOpen>{text}</TagText>
        </TextBox>
    );
}

const TextBox = styled.div<Props>`
  
  display: inline-block;
  
  border-radius: 5px;
  
  padding: 1.5px;
  padding-bottom: 3px;
  
  justify-items: center;
  
  //옆에 글씨랑 띄우기
  margin-left: 10px;
  

  background-color: ${props => (props.isOpen ? "#FEF0EB":"#E9F3FF")};


`;

// @ts-ignore
const TagText = styled.text<Props>`
  
  font-family: Pretendard;
  font-weight: 400;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 1.5vh;

  color: ${(props) => (props.isOpen ? ('#F56C3B'):('#83BBF8'))};


`;

