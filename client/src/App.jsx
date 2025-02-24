import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Test from "./components/lobby/Test";
import { Route,Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lobby" element={<Test />} />
      </Routes>
    </div>
  );
};

export default App;
