import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const InviteNewPersonPage = () => {
  const { eventId } = useParams();
  const [eventName, setEventName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchEventName = async () => {
      try {
        const response = await fetch(`http://localhost:3001/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        const eventData = await response.json();
        setEventName(eventData.name);
      } catch (error) {
        console.error("Error fetching event:", error);
        alert("Failed to fetch event. Please try again later.");
      }
    };

    fetchEventName();
  }, [eventId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/events/${eventId}/invites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            phone,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to invite person");
      }
      // Reset form fields after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      alert("Person invited successfully!");
    } catch (error) {
      console.error("Error inviting person:", error);
      alert("Failed to invite person. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Invite New Person to {eventName}</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Enter first name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Enter last name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Phone Number</label>
          <div className="control">
            <input
              className="input"
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary" type="submit">
              Invite Person
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InviteNewPersonPage;
