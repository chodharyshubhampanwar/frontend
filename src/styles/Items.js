import styled from "styled-components";

export const ItemsWrapper = styled.div`
  transition: all 0.3s ease;
  background-color: white;
`;

export const ItemContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1200px;
  transition: all 0.3s ease;
  width: 100%;
`;

export const SearchInputWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 10px 0;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px 20px;
  position: relative;
  flex: 1;
  border-radius: 50px;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
`;

export const SortSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  padding: 10px 10px;
  color: white;
  border-radius: 50px;
`;

export const SortSelect = styled.select`
  background: transparent;
  border: none;
  color: white;
`;

export const ItemSelection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
  background-color: black;
  color: white;
  border-radius: 50px;
  padding: 10px 15px;
`;

export const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
`;

export const SectionInfoWrpper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 20px 0;
  width: 100%;
`;

export const Heading = styled.span`
  color: rgb(32, 33, 36);
  font-size: 40px;
  font-weight: 700;
  line-height: 44px;
  margin-bottom: 10px;
  padding: 0;
`;

export const Description = styled.span`
  color: rgb(95, 99, 104);
  font-size: 20px;
  font-weight: 400;
  line-height: 22px;
  margin-bottom: 10px;
  padding: 0;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;
