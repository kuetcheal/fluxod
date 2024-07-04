import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./components/user";
import Recu from "./components/recu";
import MovieCard from "./components/MovieCard"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/recu" element={<Recu />} />
        <Route path="/MovieCard" element={<MovieCard />} /> 
      </Routes>
    </Router>
  );
};

export default App;
