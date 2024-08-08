import React, { useState, useContext } from "react";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const SocialLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, login, logout } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const userData = await login();
      const response = await axios.post("http://localhost:5000/api/register", {
        email: userData.email,
        token: userData.accessToken,
        firebaseId: userData.uid,
      });

      if (
        response.data.message === "User already exists" ||
        response.data.message === "User registered successfully"
      ) {
        navigate("/dashboard");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out");
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      {error && <ErrorText>{error}</ErrorText>}
      {currentUser ? (
        <Button disabled={loading} onClick={handleLogout}>
          {loading ? <LoadingIcon /> : <ButtonText>Log Out</ButtonText>}
        </Button>
      ) : (
        <Button disabled={loading} onClick={handleLogin}>
          {loading ? (
            <LoadingIcon />
          ) : (
            <>
              <ButtonText>Get Started</ButtonText>
            </>
          )}
        </Button>
      )}
    </>
  );
};

export default SocialLogin;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ErrorText = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const Button = styled.button`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  line-height: 24px;
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  background-color: #1865f2;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoadingIcon = styled(AiOutlineLoading)`
  animation: ${spinAnimation} 1s linear infinite;
`;

const ButtonText = styled.span`
  font-size: 16px;
`;
