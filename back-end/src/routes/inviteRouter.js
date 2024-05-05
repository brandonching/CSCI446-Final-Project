import { Router } from "express";
import { ObjectId } from "mongodb";

const InviteRouter = Router();
InviteRouter.mergeParams = true;

InviteRouter.get("/", async (req, res) => {
  const db = req.app.get("db");
  const invites = await db.collection("invites").find().toArray();

  return res.json(invites);
});

InviteRouter.get("/:inviteId", async (req, res) => {
  const db = req.app.get("db");
  const invite = await db.collection("invites").findOne({
    _id: ObjectId(req.params.inviteId),
  });

  return res.json(invite);
});

InviteRouter.post("/", async (req, res) => {
  const db = req.app.get("db");
  const result = await db.collection("invites").insertOne(req.body);

  return res.json(result.ops[0]);
});

InviteRouter.put("/:inviteId", async (req, res) => {
  const db = req.app.get("db");
  const result = await db
    .collection("invites")
    .updateOne({ _id: ObjectId(req.params.inviteId) }, { $set: req.body });

  return res.json(result);
});

InviteRouter.delete("/:inviteId", async (req, res) => {
  const db = req.app.get("db");
  const result = await db
    .collection("invites")
    .deleteOne({ _id: ObjectId(req.params.inviteId) });

  return res.json(result);
});

export default InviteRouter;
