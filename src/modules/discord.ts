import { Client, User, PresenceStatusData } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";
import discordListener from "./discord_listener";

type ExcludeEnum<T, K extends keyof T> = Exclude<keyof T | T[keyof T], K | T[K]>;

export class Discord extends Client {
    yasha: User | null = null;
    defaultPrescence: string = "Typescript & SUFFERING IN LAZINESS";
    defaultSatus: ExcludeEnum<typeof ActivityTypes, "CUSTOM"> = "COMPETING";

    constructor() {
        super({ intents: ["GUILDS", "DIRECT_MESSAGES", "GUILD_MESSAGES"] });
        discordListener.bind(this)();
    }

    async setStatus(
        label: string = this.defaultPrescence,
        duration: number = 0,
        permenant: boolean = false,
        status: ExcludeEnum<typeof ActivityTypes, "CUSTOM"> = this.defaultSatus,
    ) {
        let subLabel;
        if (duration) {
            subLabel;
        }
        this.user?.setPresence({
            activities: [{ name: `${label} ${subLabel ? `: ${subLabel}` : ""}`, type: "COMPETING" }],
        });
        if (duration > 0 && !permenant) {
            setTimeout(() => {
                this.setStatus(label, duration - 1000, permenant, status);
            }, 1000);
        }
    }

    async log(message: string) {
        if (this.yasha) {
            this.yasha.send(message);
        } else {
            console.log(message);
        }
    }
}
