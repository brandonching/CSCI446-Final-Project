import { Router } from "express";
import { ObjectId } from "mongodb";
import TodosRouter from "./invite.js";

const EventsRouter = Router();

EventsRouter.use("/:eventId/invite", TodosRouter);

EventsRouter.get("/", async (req, res) => {
  const db = req.app.get("db");
  const events = await db.collection("events").find().toArray();

  return res.json(events);
});

EventsRouter.get("/:eventId", async (req, res) => {
  const db = req.app.get("db");
  const event = await db.collection("events").findOne({
    _id: ObjectId(req.params.eventId),
  });

  return res.json(event);
});

EventsRouter.post("/", async (req, res) => {
  const db = req.app.get("db");
  const result = await db.collection("events").insertOne(req.body);

  return res.json(result.ops[0]);
});

EventsRouter.put("/:eventId", async (req, res) => {
  const db = req.app.get("db");
  const result = await db
    .collection("events")
    .updateOne({ _id: ObjectId(req.params.eventId) }, { $set: req.body });

  return res.json(result);
});

EventsRouter.delete("/:eventId", async (req, res) => {
  const db = req.app.get("db");
  const result = await db
    .collection("events")
    .deleteOne({ _id: ObjectId(req.params.eventId) });

  return res.json(result);
});

export default EventsRouter;
