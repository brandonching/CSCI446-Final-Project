import { Router } from "express";
import { ObjectId } from "mongodb";

const InviteRouter = Router();
InviteRouter.mergeParams = true;

InviteRouter.get("/", async (req, res) => {
  const db = req.app.get("db");
  const { eventId } = req.params;
  const invites = await db
    .collection("invites")
    .find({ event_id: new ObjectId(eventId) })
    .toArray();

  return res.json(invites);
});

InviteRouter.get("/:inviteId", async (req, res) => {
  const db = req.app.get("db");
  const { eventId } = req.params;
  const invite = await db.collection("invites").findOne({
    event_id: new ObjectId(eventId),
    _id: new ObjectId(req.params.inviteId),
  });

  return res.json(invite);
});

InviteRouter.post("/", async (req, res) => {
  const db = req.app.get("db");
  const { eventId } = req.params;

  try {
    const result = await db.collection("invites").insertOne({
      ...req.body,
      event_id: new ObjectId(eventId),
    });
    console.info(result);
    res.status(201).json(result.insertedId);
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
});

InviteRouter.put("/:inviteId", async (req, res) => {
  const db = req.app.get("db");
  const { eventId, inviteId } = req.params;
  const result = await db.collection("invites").updateOne(
    {
      event_id: new ObjectId(eventId),
      _id: new ObjectId(inviteId),
    },
    { $set: req.body }
  );

  return res.json(result);
});

InviteRouter.delete("/:inviteId", async (req, res) => {
  const db = req.app.get("db");
  const result = await db
    .collection("invites")
    .deleteOne({ _id: new ObjectId(req.params.inviteId) });

  return res.json(result);
});

export default InviteRouter;
