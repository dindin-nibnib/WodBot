import "reflect-metadata";
import { Client } from "discordx";
import { Intents, Message } from "discord.js";
import { randomInt } from "crypto";

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
    if (message.author.bot)
        return;
    
    if (message.channelId === "953671116147277867") {
        if (randomInt(0, 2)) {
            message.reply("You've been eaten.");
        }
    }
});

client.login("OTg1MTcxMTA5NDkyMTY2NjY2.GZBc_3.hbsj4FngTZiTK6XaqdLc67Lrv0dyDeTpV0CFCc");