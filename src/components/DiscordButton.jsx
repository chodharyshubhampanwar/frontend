import React from "react";
import styled from "styled-components";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

const DiscordButton = () => {
  const discordLink = "https://discord.gg/Bd9FTFVV";

  return (
    <StyledLink to={discordLink} target="_blank">
      <StyledButton>
        <DiscordIcon />
        <ButtonText>{"Clubs"}</ButtonText>
      </StyledButton>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5865f2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4752c4;
  }
  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`;

const DiscordIcon = styled(FaDiscord)`
  margin-right: 8px;
`;

const ButtonText = styled.span``;

export default DiscordButton;
