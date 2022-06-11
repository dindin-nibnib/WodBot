import "reflect-metadata";
import { Client } from "discordx";
import { Intents, Message } from "discord.js";
import { randomInt } from "crypto";
const { clientId, guildId, token } = require('./config.json');

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

client.on("messageCreate", (message) => {
    // To avoid bot loop (bot answering to itself)
    if (message.author.bot) {
        return;
    }

    if (message.channel.type == "GUILD_TEXT") {
        if (message.channel.nsfw) {
            if (randomInt(0, 2) == 0) {
                message.reply("You've been eaten.");
            }
        }
    }

});

client.login("OTg1MTcxMTA5NDkyMTY2NjY2.GZBc_3.hbsj4FngTZiTK6XaqdLc67Lrv0dyDeTpV0CFCc");