import { connect, disconnect, cUser, connected, UserDocument, userSample } from "$db";
import { Client, CommandInteractionOption, Interaction, Message, MessageEmbed, User } from "discord.js";
import { MongoServerError, ObjectId } from "mongodb";
import { Discord } from "./discord";

// type 'guard'
// TODO: name
type x<T> = T extends T ? T : never;
type xx<T, P> = { [K in keyof T]?: P };
// type a = x<NonNullable<UserDocument["spark"]>>;
type UserSpark = xx<x<NonNullable<UserDocument["spark"]>>, number>;

function sparkOptionValidate(
    option: CommandInteractionOption,
): option is CommandInteractionOption & { name: keyof UserSpark; value: number | string } {
    console.log(Object.keys(userSample.spark!), Object.keys(userSample.spark!).includes(option.name));
    console.log(typeof option.value === "string" || typeof option.value === "number" || typeof option.value === "bigint");
    console.log(!!Number.isInteger(parseInt(option.value!.toString())));
    return (
        Object.keys(userSample.spark!).includes(option.name) &&
        (typeof option.value === "string" || typeof option.value === "number" || typeof option.value === "bigint") &&
        !!Number.isInteger(parseInt(option.value.toString()))
    );
}

//

async function onReady(this: Discord, client: Client) {
    console.log(this.user);
    await this.setStatus();
}
async function onMessage(this: Discord, message: Message) {
    console.log(`${message.author.username}#${message.author.discriminator}:  ${message.content}`);
    if (message.guild?.id === "319251779013574657" && message.content === "$init") {
        console.log(message.guild.id);
        const yashabottest = await message.guild?.commands.create({
            name: "yashabottest",
            description: "Pong",
            defaultPermission: true,
            // default_permission: undefined,
            // guild_id: undefined,
            type: "CHAT_INPUT",
            options: [
                {
                    name: "name",
                    description: "description",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "name",
                            value: "value",
                        },
                    ],
                },
            ],
        });

        const spark = await this.application?.commands.create({
            name: "spark",
            description: "Granblue Fantasy Spark Counter",
            defaultPermission: true,
            // guild_id: undefined,
            type: "CHAT_INPUT",
            options: [
                {
                    name: "currency",
                    description: "The Currency",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "Crystal",
                            value: "crystal",
                        },
                        {
                            name: "Ticket",
                            value: "ticket",
                        },
                        {
                            name: "10-Part Ticket",
                            value: "tenTicket",
                        },
                        {
                            name: "MobaCoin",
                            value: "mobaCoin",
                        },
                    ],
                },
                {
                    name: "function",
                    description: "The Function",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "Set",
                            value: "SET",
                        },
                    ],
                },
                {
                    name: "value",
                    description: "The Value",
                    type: "INTEGER",
                    required: true,
                },
            ],
        });

        console.log("yashabottest", yashabottest.id);
        console.log("spark", spark?.id);
    }
}

async function onInteraction(this: Discord, interaction: Interaction) {
    if (!interaction.isCommand()) {
        return console.log(interaction);
    }

    if (interaction.type === "APPLICATION_COMMAND") {
        if (interaction.commandName === "yashabottest") {
            await interaction.reply("Success");
        }
        if (interaction.commandName === "spark") {
            // console.log(interaction.member?.user.id, interaction.member?.user.username, interaction.member?.user.discriminator);
            console.log(interaction.user.id, interaction.user.username, interaction.user.discriminator);

            const data: UserSpark = {};
            console.log(interaction.options.data);
            for (const option of interaction.options.data) {
                if (sparkOptionValidate(option)) data[option.name] = parseFloat(option.value.toString());
                else console.log(option);
            }
            console.log(data);
            await connect();
            try {
                const user = await cUser.findOne({ userId: interaction.user.id });
                if (!user) await initUser(interaction.user);

                console.log(
                    await cUser.updateOne(
                        { userId: interaction.user.id },
                        {
                            $set: {
                                spark: data,
                            },
                        },
                    ),
                );
                await disconnect();
                await interaction.reply("OK");
            } catch (err) {
                console.error(err);
                await interaction.reply("FAILED");
            }
        }
    }
}

export default function (this: Discord) {
    this.on("ready", onReady.bind(this));
    this.on("messageCreate", onMessage.bind(this));
    this.on("interactionCreate", onInteraction.bind(this));
}
async function initUser(user: User) {
    if (!connected) await connect();
    try {
        console.log(
            await cUser.insertOne({
                _id: new ObjectId(),
                userId: user.id,
            }),
        );
    } catch (err: any) {
        console.log((err as MongoServerError).errInfo!.details);
    }
}
