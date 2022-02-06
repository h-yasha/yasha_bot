import dotenv from "dotenv";
import { Discord } from "./modules/discord";
try {
    dotenv.config();
} catch {}
import { createServer } from "./server";

class Yashabot {
    constructor(public readonly server = createServer(), public readonly discord = new Discord()) {}
    async init() {
        // this.Discord.login(process.env.DISCORD_TOKEN)
    }
}

import { User } from "./models/user";
import { ObjectId } from "mongodb";
import papr, { connect, disconnect } from "./modules/papr";

(async () => {
    await connect();
    await User.insertOne({
        _id: new ObjectId(),
    });
    await disconnect();
})();

const yashabot = new Yashabot();

yashabot.server.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
});

yashabot.discord.login(process.env.BOT_TEST ? process.env.DISCORD_TOKEN_TEST : process.env.DISCORD_TOKEN);

export default yashabot;
