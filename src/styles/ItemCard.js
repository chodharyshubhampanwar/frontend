import styled from "styled-components";

export const ItemCardWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  border-radius: 5px;
`;

export const AttemptWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  svg {
    margin-right: 5px;
  }
  button {
    background-color: #0070f3;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    color: #ededed;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
  }
`;

export const ItemInfoLogo = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 8px;
  background-image: ${(props) => `url(${props.imageUrl})`};
  background-size: cover;
  background-color: #f1f1f1;
`;

export const ItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 20px;
  span {
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  }
`;

export const ItemTitle = styled.p`
  color: rgb(32, 33, 36);
  font-size: 16px;
  font-weight: 800;
  line-height: 24px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;
