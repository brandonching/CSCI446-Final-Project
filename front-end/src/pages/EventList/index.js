import React, { useState, useEffect } from "react";
import EventCard from "../../components/EventCard";
import { Link } from "react-router-dom";

const EventPage = () => {
  // Call the API to get the list of events
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/events");
        const data = await response.json();
        setEvents(data); // Update events state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getEvents();
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div className="container">
      <div className="columns is-multiline">
        {events.map((event) => (
          <div key={event._id} className="column is-one-third">
            {/* Wrap each EventCard in a Link component */}
            <Link to={`/events/${event._id}`}>
              <EventCard
                image={event.image}
                name={event.name}
                description={event.description}
                date={event.date}
                location={event.location}
                numOfPeople={event.numOfPeople}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
