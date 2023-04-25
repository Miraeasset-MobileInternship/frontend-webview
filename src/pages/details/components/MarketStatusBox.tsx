import StockDetailTypes from "../../../types/StockDetailTypes";
import styled, {css} from 'styled-components';
import React from "react";


interface Props{
    isOpen? : boolean;
}




export default function MarketStatusBox ({isOpen}:Props){

    const text = isOpen ? "OPEN" : "CLOSED";
    const color = isOpen ? '#FFF5F5': '#F2FAFF';
    const textColor = isOpen ? '#FF484E': '#026BFB';

    return (
        <TextBox style={{backgroundColor: color}}>
            <TagText style={{color: textColor}}>{text}</TagText>
        </TextBox>
    );
}

const TextBox = styled.div<Props>`
  margin-right: 5px;
  
  display: inline-block;
  
  border-radius: 5px;
  
  padding: 1.5px;
  padding-bottom: 3px;
  
  justify-items: center;
  
  //옆에 글씨랑 띄우기
  margin-left: 10px;
  

  background-color: ${props => (props.isOpen ? "#FFF5F5":"#F2FAFF")};


`;

// @ts-ignore
const TagText = styled.text<Props>`
  
  font-family: Pretendard;
  font-weight: 400;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 1.5vh;

  color: ${(props) => (props.isOpen ? ('#FF484E'):('#026BFB'))};


`;

