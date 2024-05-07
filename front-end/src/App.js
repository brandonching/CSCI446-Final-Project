import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EventList from "./pages/EventList/index";
import EventDetailed from "./pages/EventDetailed/index";
import EventNew from "./pages/EventNew/index";
import InviteList from "./pages/InviteList/index";
import InviteNew from "./pages/InviteNew/index";
import InviteDetailed from "./pages/InviteDetailed/index";

function App() {
  return (
    <Router>
      <div className="Event Board">
        <Navbar />
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:eventId" element={<EventDetailed />} />
          <Route path="/events/new" element={<EventNew />} />
          <Route path="/events/:eventId/invite/new" element={<InviteNew />} />
          <Route path="/events/:eventId/invites" element={<InviteList />} />
          <Route
            path="/events/:eventId/invites/:inviteId"
            element={<InviteDetailed />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
