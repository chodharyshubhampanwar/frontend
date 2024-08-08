import React, { useState } from "react";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLoginClick = async () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    try {
      setLoading(true);
      const result = await firebase.auth().signInWithPopup(googleAuthProvider);
      const userData = result.user;
      console.log("User logged in:", userData);

      // Send user data to your server
      const formData = new FormData();
      formData.append("email", userData.email);
      const response = await axios.post("/register", formData);
      console.log(response.data.message);

      navigate("/");
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.log("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGoogleLoginClick();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error && <p>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
