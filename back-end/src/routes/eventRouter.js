import { Router } from "express";
import { ObjectId } from "mongodb";
import InviteRouter from "./inviteRouter.js";

const EventsRouter = Router();

EventsRouter.use("/:eventId/invite", InviteRouter);

EventsRouter.get("/", async (req, res) => {
  const db = req.app.get("db");
  const events = await db.collection("events").find().toArray();

  return res.json(events);
});

EventsRouter.get("/:eventId", async (req, res) => {
  const db = req.app.get("db");
  const event = await db.collection("events").findOne({
    _id: new ObjectId(req.params.eventId),
  });

  return res.json(event);
});

EventsRouter.post("/", async (req, res) => {
  const db = req.app.get("db");

  try {
    const result = await db.collection("events").insertOne(req.body);
    console.info(result);
    res.status(201).json(result.insertedId);
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
});

EventsRouter.put("/:eventId", async (req, res) => {
  const db = req.app.get("db");
  const result = await db
    .collection("events")
    .updateOne({ _id: new ObjectId(req.params.eventId) }, { $set: req.body });

  return res.json(result);
});

EventsRouter.delete("/:eventId", async (req, res) => {
  const db = req.app.get("db");
  const result = await db
    .collection("events")
    .deleteOne({ _id: new ObjectId(req.params.eventId) });

  return res.json(result);
});

export default EventsRouter;
