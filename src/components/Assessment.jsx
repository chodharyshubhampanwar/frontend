import React from "react";
import {
  ItemContainer,
  ItemTitle,
  ItemInfo,
  StartItemButton,
  ItemWrapper,
  ItemInfoWrapper,
  ItemInfoSummary,
  Label,
} from "./../styles/Assessment.js";
import { toTitleCase } from "./../utils/stringCase.js";
import { convertToTimeFormat } from "./../utils/time.js";

const Assessment = ({ item, onStart, questionCounts }) => {
  return (
    <ItemWrapper>
      <ItemContainer>
        <ItemInfoWrapper>
          <ItemTitle>{item.title}</ItemTitle>
          <Label>{"About:"}</Label>
          <ItemInfo>{item.description}</ItemInfo>
          <Label>{"Covered Topics:"}</Label>
          <ul>
            {item.topics ? (
              item.topics.map((topic, index) => (
                <li key={index}>{toTitleCase(topic)}</li>
              ))
            ) : (
              <li>None</li>
            )}
          </ul>
        </ItemInfoWrapper>
        <ItemInfoSummary>
          <ItemTitle>{"Overview"}</ItemTitle>
          <Label>{"Duration"}</Label>
          <ItemInfo>
            {convertToTimeFormat(item.duration, "totalMinutes", "seconds")}
            {" Minutes"}
          </ItemInfo>
          <Label>{"Difficulty"}</Label>
          <ItemInfo>{item.level}</ItemInfo>
          <Label>{"Questions"}</Label>
          <div>
            {Object.entries(questionCounts).map(([type, count]) => (
              <ItemInfo key={type}>{`${type} - ${count}`}</ItemInfo>
            ))}
          </div>
          <StartItemButton onClick={onStart}>
            {"I'm ready to begin"}
          </StartItemButton>
        </ItemInfoSummary>
      </ItemContainer>
    </ItemWrapper>
  );
};

export default Assessment;
