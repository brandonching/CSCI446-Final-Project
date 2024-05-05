import express from "express";
import cors from "cors";
import EventsRouter from "./routes/eventRouter.js";
import InviteRouter from "./routes/inviteRouter.js";
import { MongoClient } from "mongodb";

async function connect() {
  const client = new MongoClient("mongodb://localhost:27017");
  const connection = await client.connect();
  return connection.db("spa-database");
}

const port = 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/events", EventsRouter);
app.use("/invites", InviteRouter);

const database = await connect();
app.set("db", database);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
  // Check if the database is connected
  if (database) {
    console.info("Database connected");
  } else {
    console.error("Database connection failed");
  }
});