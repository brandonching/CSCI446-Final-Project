# CSCI446 Final Project

## Team Members

- [Brandon Ching](mailto:bching@mines.edu)
- [Brendan Burmeister](mailto:brendanburmeister@mines.edu)
- [Thomas Applegate](mailto:tapplegate@mines.edu)

## Project Description

The project is a simple application which allows users to view events and invite people to them. For the purposes of this project, it is specifically focused on School of Mines Graduation related activities. The application allows users to create events, view events, update events, delete events, create invites, view invites, update invites, and delete invites.

## Project Questions

Original Idea:
The application will facilitate the management of graduation-related events, showcasing each event's details such as time, description, and additional information. Additionally, users will have the capability to add or remove invitees for specific events.

1. Were there areas of unexpected complexity? If so, how did you handle them or how did you decide to cut scope?
We had some issues with connecting our index.js file to Bulma CSS. We also had some technical issues with one of us having the formatting on his device displaying differently than how ours.

2. What was the most interesting part of the final project?
The most interesting part of the final project was learning how to use React and Express. It was interesting to see how the front end and back end communicate with each other.
I liked the creativity that we had giving us the ability to make whatever we chose. The guidelines were so light that we just implemented what we thought would be nice.

3. If you had more time, what do you wish you could have added to the final project?

If we had more time we would have changed our styling and made it look more refined overall. Also we would have added boxes around events and invites to make the site look more filled. Another change we considered was clearing white space, we could do this by making boxes bigger or added more functionality such as opening links to RSVP for events.

## Front End (React)

The front end is a React application which uses Bulma css for styling.

## Back End (Express)

The back end is an Express application which uses a MongoDB database. The following endpoints are available:

### Event Routes

- `GET /events` - Get all events
- `POST /events` - Create a new event
- `GET /events/:eventId` - Get a specific event
- `PUT /events/:eventId` - Update a specific event
- `DELETE /events/:eventId` - Delete a specific event

### Invite Routes

- `GET /events/:eventId/invites` - Get all invites for a specific event
- `POST /events/:eventId/invites` - Create a new invite for a specific event
- `GET /events/:eventId/invites/:inviteId` - Get a specific invite for a specific event
- `PUT /events/:eventId/invites/:inviteId` - Update a specific invite for a specific event
- `DELETE /events/:eventId/invites/:inviteId` - Delete a specific invite for a specific event

### Database Schema (MongoDB)

#### Events

```json
{
    "_id": ObjectId,
    "name": String,
    "description": String,
    "date": Date,
    "start_time": Date,
    "end_time": Date,
    "location": String,
    "image_url": String
}
```

#### Invites

```json
{
    "_id": ObjectId,
    "event_id": ObjectId,
    "first_name": String,
    "last_name": String,
    "email": String,
    "phone": String,
    "rsvp": String
}
```

## Deployment

To run the application locally, simply run the following commands:

```bash
cd backend
npm install
npm start
```

```bash
cd frontend
npm install
npm start
```

The application will be available at `http://localhost:3000`.

It is also recommended to restore the mongoDB database using the following command:

```bash
mongorestore ./mongo
```
