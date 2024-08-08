// src/AppRouter.js
import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
