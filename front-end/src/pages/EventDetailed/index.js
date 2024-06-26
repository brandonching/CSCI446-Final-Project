import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa"; // Import icons from Font Awesome

function EventDetailPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [invitedPeople, setInvitedPeople] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "last_name",
    direction: "asc",
  });

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
          `http://localhost:3001/events/${eventId}/invites`
        );
        const data = await response.json();
        setInvitedPeople(data);
      } catch (error) {
        console.error("Error fetching invited people:", error);
      }
    };

    fetchInvitedPeople();
  }, [eventId]);

  const deleteInvite = async (inviteId) => {
    // Give the user a confirmation prompt before deleting the invite
    if (window.confirm("Are you sure you want to delete this invite?")) {
      try {
        await fetch(
          `http://localhost:3001/events/${eventId}/invites/${inviteId}`,
          {
            method: "DELETE",
          }
        );
        // After successful deletion, remove the deleted invite from the state
        setInvitedPeople(
          invitedPeople.filter((person) => person._id !== inviteId)
        );
      } catch (error) {
        console.error("Error deleting invite:", error);
      }
    }
  };

  const deleteEvent = async () => {
    // Give the user a confirmation prompt before deleting the event
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await fetch(`http://localhost:3001/events/${eventId}`, {
          method: "DELETE",
        });
        // After successful deletion, redirect the user to the event list page
        window.location.href = "/events";
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedInvitedPeople = [...invitedPeople].sort((a, b) => {
    if (sortConfig.key !== null) {
      if (sortConfig.key === "rsvp") {
        // Custom sorting logic for RSVP column
        const rsvpOrder = { null: 0, false: 1, true: 2 };
        const aValue = rsvpOrder[a.rsvp];
        const bValue = rsvpOrder[b.rsvp];
        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      } else {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      }
    } else {
      return 0;
    }
  });

  if (!event) {
    return <div>Loading...</div>; // Return a loading indicator while fetching data
  }

  const renderSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return null;
  };

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
            <strong>Date:</strong>{" "}
            {new Date(event.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {" @ "}
            {event.start_time} - {event.end_time}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Number of People Invited:</strong> {invitedPeople.length}
          </p>
          <Link
            to={`/events/${eventId}/invite/new`}
            className="button is-primary"
          >
            Add New Invite
          </Link>
          <button className="button is-primary" onClick={deleteEvent}>
            Delete Event
          </button>
        </div>
      </div>
      <a href={`/events/${eventId}/invites`}>
        <h2 className="title is-3">Invited People</h2>
      </a>

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => sortBy("first_name")}>
              First Name {renderSortIndicator("first_name")}
            </th>
            <th onClick={() => sortBy("last_name")}>
              Last Name {renderSortIndicator("last_name")}
            </th>
            <th onClick={() => sortBy("email")}>
              Email {renderSortIndicator("email")}
            </th>
            <th onClick={() => sortBy("phone")}>
              Phone Number {renderSortIndicator("phone")}
            </th>
            <th onClick={() => sortBy("rsvp")}>
              RSVP {renderSortIndicator("rsvp")}
            </th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {sortedInvitedPeople.map((person) => (
            <tr key={person._id}>
              <td>{person.first_name}</td>
              <td>{person.last_name}</td>
              <td>{person.email}</td>
              <td>{person.phone}</td>
              <td>
                {person.rsvp === null && "❔"}
                {person.rsvp === true && <FaCheck style={{ color: "green" }} />}
                {person.rsvp === false && <FaTimes style={{ color: "red" }} />}
              </td>
              <td>
                <button onClick={() => deleteInvite(person._id)}>Delete</button>
              </td>
              <td>
                <Link to={`/events/${eventId}/invites/${person._id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventDetailPage;
