import { Router } from "express";
import { ObjectId } from "mongodb";
import { connect, disconnect, cChannel, cUser } from "$db";

const router = Router();

router.get("/", async (req, res) => {
    if (!(await connect())) res.sendStatus(500);
    res.json(
        await cChannel.insertOne({
            _id: new ObjectId(),
            channelId: "319251779013574657",
            // mangaIds: [],
            serverId: "319251779013574657",
        }),
    );
    await disconnect();
});

export default router;
