import React from "react";
import { Route, Routes } from "react-router-dom";

import CreateTrip from "./create-trip";
import Home from "./home";
import ViewTrip from "./view-trip";
import UserTrips from "./UserTrips";
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/create-trip" element={<CreateTrip />} />
      <Route path="/trip/:id" element={<ViewTrip />} />
      <Route path="/myTrips/" element={<UserTrips />} />

      <Route path="/home" element={<Home />} />
      <Route path="/" index element={<Home />} />
    </Routes>
  );
};

export default App;
