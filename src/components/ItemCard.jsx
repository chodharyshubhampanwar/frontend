import React from "react";
import { Link } from "react-router-dom";
import { RiPencilRulerFill } from "react-icons/ri";
import {
  ItemCardWrapper,
  AttemptWrapper,
  ItemInfoLogo,
  ItemInfoWrapper,
  ItemTitle,
} from "./../styles/ItemCard.js";

const ItemCard = ({ item, itemType, startButtonLink, subjectLink }) => {
  return (
    <ItemCardWrapper>
      <ItemInfoLogo imageUrl={item.logo} />
      <ItemInfoWrapper>
        <ItemTitle>{item.title}</ItemTitle>
        <span>{item.course}</span>
        <Link to={subjectLink}>
          <span>{item.subject}</span>
        </Link>
      </ItemInfoWrapper>
      <AttemptWrapper>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <RiPencilRulerFill />
          {"50"}
        </div>
        <Link to={startButtonLink}>
          <button>Start {itemType}</button>
        </Link>
      </AttemptWrapper>
    </ItemCardWrapper>
  );
};

export default ItemCard;
