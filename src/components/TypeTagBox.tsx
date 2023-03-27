import StockDetailInfo from "../types/StockDetailInfo";
import styled, {css} from 'styled-components';
import React from "react";
import {useEffect} from "react";


interface Props {
    text : string;
}




export default function TypeTagBox ({text}:Props){

    return (
        <TextBox>
            <TagText>{text}</TagText>
        </TextBox>
    );
}

const TextBox = styled.div`
  
  display: inline-block;
  
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  
  padding:1.5px;
  padding-bottom:3px;
  
  justify-items: center;
  
  border-color: "#E9E9E9";
  background-color: "white";
  

`;

const TagText = styled.text`
  
  font-family: Pretendard;
  font-weight: 400;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 1.5vh;

  color : "#8C8C8C";
  


`;

