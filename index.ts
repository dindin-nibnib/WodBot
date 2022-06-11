import "reflect-metadata";
import { Client } from "discordx";
import { GuildMember, Intents, Message } from "discord.js";
import { randomInt } from "crypto";
import { APIInteractionDataResolvedGuildMember, Snowflake } from "discord-api-types/v9";
const { clientId, guildId, token, dungeonRole } = require("./config.json");

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.once("ready", () => {
    console.log("Ready!")
});

client.on("interactionCreate", interaction => {
    if (!interaction.isCommand())
        return;

    let minionSnowflake = interaction.options.get("minion")?.value;
    if (minionSnowflake === undefined)
        return;

    let minion = client.guilds.resolve(guildId).members.resolve(minionSnowflake.toString())


    switch (interaction.commandName) {
        case "dungeon":
            if (minion === null)
                return;
            if (minion.roles.cache.has(dungeonRole)) {
                interaction.reply({
                    content: minion.displayName + " already is in the dungeon, use /undungeon <member> to get them out!",
                    ephemeral: true
                });
            } else {
                minion.roles.add(dungeonRole).then((minion) => {
                    interaction.reply({
                        content: "Sent " + minion.displayName + " to the dungeon! (bad minion!)",
                        ephemeral: true
                    });
                })
                    .catch((err) => {
                        interaction.reply({
                            content: "Couldn't get " + minion?.displayName + " to the dungeon, they really wanted to stay in it... \n\n" + err,
                            ephemeral: true
                        });
                    });

            }
            break;

        case "undungeon":
            if (minion === null)
                return;

            if (!minion.roles.cache.has(dungeonRole)) {
                interaction.reply({
                    content: minion.displayName + " Isn't in the dungeon, use /dungeon to send them in it!",
                    ephemeral: true
                });
            } else {
                minion.roles.remove(dungeonRole).then((minion) => {
                    interaction.reply({
                        content: "Got " + minion.displayName + " out of the dungeon! (bad minion!)",
                        ephemeral: true
                    });
                })
                    .catch((err) => {
                        interaction.reply({
                            content: "Couldn't get " + minion?.displayName + " out of the dungeon, they were too strong... \n\n" + err,
                            ephemeral: true
                        });
                    });

            }
            break;

        default:
            break;
    }
})

client.on("messageCreate", (message) => {
    // To avoid bot loop (bot answering to itself)
    if (message.author.bot)
        return;

    if (message.channel.type == "GUILD_TEXT") {
        if (message.channel.nsfw) {
            if (randomInt(0, 2) == 0) {
                message.reply("You've been eaten.");
            }
        }
    }
});

client.login(token);