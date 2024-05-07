import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function InvitationDetailPage() {
  const { eventId, inviteId } = useParams();
  const [event, setEvent] = useState(null);
  const [invitation, setInvitation] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState(undefined); // Set default to undefined

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
    const fetchInvitation = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/events/${eventId}/invites/${inviteId}`
        );
        const data = await response.json();
        setInvitation(data);
        setRsvpStatus(data.rsvp);
      } catch (error) {
        console.error("Error fetching invitation:", error);
      }
    };

    fetchInvitation();
  }, [eventId, inviteId]);

  const handleRsvpChange = (newRsvpStatus) => {
    setRsvpStatus(newRsvpStatus);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/events/${eventId}/invites/${inviteId}`,
        {
          method: "PUT", // Use PUT method for updating
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rsvp: rsvpStatus }), // Send the updated RSVP status
        }
      );
      if (response.ok) {
        console.log("RSVP status updated successfully");
      } else {
        console.error("Failed to update RSVP status");
      }
    } catch (error) {
      console.error("Error updating RSVP status:", error);
    }
  };

  if (!invitation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="title is-2">You're Invited!</h1>
      <div className="box">
        <p>
          <strong>Event Name:</strong> {event.name}
        </p>
        <p>
          <strong>Event Date:</strong> {new Date(event.date).toLocaleString()}
        </p>

        <p>
          <strong>Event Location:</strong> {event.location}
        </p>

        <p>
          <strong>Event Description:</strong> {event.description}
        </p>
      </div>
      <div className="box" style={{ textAlign: "center" }}>
        <h2 className="title is-4">Ticket</h2>
        <p> Show this at the door for entry</p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Rickrolling_QR_code.png?20200615212723"
          alt="ticket"
        />
        <p>{invitation._id}</p>
      </div>
      <div className="box">
        <p>
          <strong>First Name:</strong> {invitation.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {invitation.last_name}
        </p>
        <p>
          <strong>Email:</strong> {invitation.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {invitation.phone}
        </p>
        <p>
          <strong>RSVP Status:</strong>{" "}
          {rsvpStatus === null
            ? "No response"
            : rsvpStatus
            ? "Attending"
            : "Not attending"}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="box">
          <h2 className="title is-4">Update RSVP Status</h2>
          <div className="control">
            <label className="radio">
              <input
                type="radio"
                value={true}
                checked={rsvpStatus === true}
                onChange={() => handleRsvpChange(true)}
              />
              <span>Accept</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                value={false}
                checked={rsvpStatus === false}
                onChange={() => handleRsvpChange(false)}
              />
              <span>Decline</span>
            </label>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InvitationDetailPage;
