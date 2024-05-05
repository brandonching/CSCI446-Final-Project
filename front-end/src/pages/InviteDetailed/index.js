import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa"; // Import icons from Font Awesome

function EventDetailPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [invitedPeople, setInvitedPeople] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "last_name",
    direction: "asc",
  });
  const [selectedInvite, setSelectedInvite] = useState(null);  // Moved inside the component

  useEffect(() => {
    async function fetchData() {
      try {
        const eventResponse = await fetch(`http://localhost:3001/events/${eventId}`);
        const event = await eventResponse.json();
        setEvent(event);

        const invitesResponse = await fetch(`http://localhost:3001/events/${eventId}/invites`);
        const invites = await invitesResponse.json();
        setInvitedPeople(invites);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [eventId]);

  const fetchInviteDetails = async (inviteId) => {
    try {
      const response = await fetch(`http://localhost:3001/events/${eventId}/invites/${inviteId}`);
      const invite = await response.json();
      setSelectedInvite(invite);
    } catch (error) {
      console.error("Error fetching invite details:", error);
    }
  };
  const renderInviteDetails = () => {
    if (!selectedInvite) return null; 
  
    return (
      <div style={{ background: '#f4f4f4', padding: '20px', margin: '20px 0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h4>{selectedInvite.first_name} {selectedInvite.last_name}'s invite to {event.name}</h4>
        <br></br>
        <p>Info:</p>

        <p>Email: {selectedInvite.email}</p>
        <p>Phone: {selectedInvite.phone}</p>
        <p>RSVP Status: {selectedInvite.rsvp ? 'Accepted' : (selectedInvite.rsvp === false ? 'Declined' : 'Pending')}</p>

        <p>Show this ticket at your event and have fun :) </p>
        <button onClick={() => setSelectedInvite(null)} style={{ marginTop: '10px' }}>Close Details</button>
      </div>
    );
  };
  const deleteInvite = async (inviteId) => {
    if (window.confirm("Are you sure you want to delete this invite?")) {
      try {
        await fetch(`http://localhost:3001/events/${eventId}/invites/${inviteId}`, { method: "DELETE" });
        setInvitedPeople(prev => prev.filter(person => person._id !== inviteId));
      } catch (error) {
        console.error("Error deleting invite:", error);
      }
    }
  };

  const sortBy = key => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  const sortedInvitedPeople = invitedPeople.sort((a, b) => {
    if (sortConfig.key === "rsvp") {
      const order = { null: 0, false: 1, true: 2 };
      return (order[a.rsvp] - order[b.rsvp]) * (sortConfig.direction === "asc" ? 1 : -1);
    }
    return a[sortConfig.key].localeCompare(b[sortConfig.key]) * (sortConfig.direction === "asc" ? 1 : -1);
  });

  const renderSortIndicator = key => sortConfig.key === key ? (sortConfig.direction === "asc" ? "▲" : "▼") : null;

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="title is-2">{event.name}</h1>
      <h2 className="title is-3">Invited People</h2>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => sortBy("first_name")}>First Name {renderSortIndicator("first_name")}</th>
            <th onClick={() => sortBy("last_name")}>Last Name {renderSortIndicator("last_name")}</th>
            <th onClick={() => sortBy("email")}>Email {renderSortIndicator("email")}</th>
            <th onClick={() => sortBy("phone")}>Phone Number {renderSortIndicator("phone")}</th>
            <th onClick={() => sortBy("rsvp")}>RSVP {renderSortIndicator("rsvp")}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {sortedInvitedPeople.map((person) => (
          <tr key={person._id}>
            <td onClick={() => fetchInviteDetails(person._id)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
              {person.first_name}
            </td>
            <td>{person.last_name}</td>
            <td>{person.email}</td>
            <td>{person.phone}</td>
            <td>
              {person.rsvp === null ? "❔" : 
              person.rsvp ? <FaCheck style={{ color: "green" }} /> : <FaTimes style={{ color: "red" }} />}
            </td>
            <td>
              <button onClick={() => deleteInvite(person._id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {renderInviteDetails()}
    </div>
  );
}
export default EventDetailPage;