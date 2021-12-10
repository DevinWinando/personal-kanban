import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Activity from "./pages/Activity";
// import Test from "./Test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} exact />
        <Route path="activities/:activityId" element={<Activity />} />
      </Routes>
    </Router>
  );
}

export default App;
