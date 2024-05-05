import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa"; // Import icons from Font Awesome

function EventDetailPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [invitedPeople, setInvitedPeople] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3001/events/${eventId}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    const fetchInvitedPeople = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/events/${eventId}/invitedPeople`
        );
        const data = await response.json();
        setInvitedPeople(data);
      } catch (error) {
        console.error("Error fetching invited people:", error);
      }
    };

    fetchInvitedPeople();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>; // Return a loading indicator while fetching data
  }

  return (
    <div className="container">
      <h1 className="title is-2">{event.name}</h1>
      <div className="columns">
        <div className="column">
          <img src={event.image_url} alt={event.name} />
        </div>
        <div className="column">
          <p>
            <strong>Description:</strong> {event.description}
          </p>
          <p>
            <strong>Date:</strong> {event.date}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Number of People Invited:</strong> {event.numOfPeople}
          </p>
        </div>
      </div>
      <h2 className="title is-3">Invited People</h2>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>RSVP</th>
          </tr>
        </thead>
        <tbody>
          {invitedPeople.map((person) => (
            <tr key={person.id}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.email}</td>
              <td>{person.phoneNumber}</td>
              <td>
                {person.rsvp === undefined && "❔"}
                {person.rsvp === true && <FaCheck style={{ color: "green" }} />}
                {person.rsvp === false && <FaTimes style={{ color: "red" }} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventDetailPage;
