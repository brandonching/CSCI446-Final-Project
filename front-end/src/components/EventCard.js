import React from "react";

const EventCard = ({
  image,
  name,
  description,
  date,
  start_time,
  end_time,
  location,
  numOfPeople,
}) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString(undefined, options);

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={name} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{name}</p>
            <p className="subtitle is-6">{description.slice(0, 50)}...</p>
            <p>
              <strong>Date:</strong> {formattedDate} {" @ "} {start_time} -{" "}
              {end_time}
            </p>
            <p>
              <strong>Location:</strong> {location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
