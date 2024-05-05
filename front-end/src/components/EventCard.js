import React from "react";

const EventCard = ({
  image,
  name,
  description,
  date,
  location,
  numOfPeople,
}) => {
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
              <strong>Date:</strong> {date}
            </p>
            <p>
              <strong>Location:</strong> {location}
            </p>
            <p>
              <strong>Invited:</strong> {numOfPeople} people
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
