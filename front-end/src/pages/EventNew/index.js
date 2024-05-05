import React, { useState } from "react";

const CreateEventPage = () => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imageURL, setImageURL] = useState("");

  const formatTime = (time) => {
    const date = new Date(`2000-01-01T${time}`);
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(endTime);

      const response = await fetch("http://localhost:3001/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: eventName,
          description,
          date: eventDate,
          start_time: formattedStartTime,
          end_time: formattedEndTime,
          location: "City Park", // Assuming location is always City Park based on the example
          image_url: imageURL, // Add the imageURL to the body
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      // Reset form fields after successful submission
      setEventName("");
      setDescription("");
      setEventDate("");
      setStartTime("");
      setEndTime("");
      setImageURL("");

      // Get the response body and redirect to the new event page
      const data = await response.json();
      window.location.href = `/events/${data}`;
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Create New Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Event Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Enter event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Event Description</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label">Event Date</label>
          <div className="control">
            <input
              className="input"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Start Time</label>
          <div className="control">
            <input
              className="input"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">End Time</label>
          <div className="control">
            <input
              className="input"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Image URL</label>
          <div className="control">
            <input
              className="input"
              type="url"
              placeholder="Enter image URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary" type="submit">
              Create Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
