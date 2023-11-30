import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./components/user";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<User/>} />
      </Routes>
    </Router> 
  );
};

export default App;
