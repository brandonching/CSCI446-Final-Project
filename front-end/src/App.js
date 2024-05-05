import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EventList from "./pages/EventList/index";
import EventDetailed from "./pages/EventDetailed/index";
import EventNew from "./pages/EventNew/index";

function App() {
  return (
    <Router>
      <div className="Event Board">
        <Navbar />
        <Routes>
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:eventId" element={<EventDetailed />} />
          <Route path="/events/new" element={<EventNew />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
