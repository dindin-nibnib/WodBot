const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder()
    .setName("dungeon")
    .setDescription("Sends someone to the dungeon")
    .addUserOption(option =>
        option.setName("minion")
        .setDescription("The minion to send to the dungeon")
        .setRequired(true)),

    new SlashCommandBuilder()
    .setName("undungeon")
    .setDescription("Gets someone out of the dungeon")
    .addUserOption(option =>
        option.setName("minion")
        .setDescription("The minion to get out of the dungeon")
        .setRequired(true))
]
.map(command => command.toJSON());
    
const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
.then(() => console.log('Successfully registered application commands.'))
.catch(console.error);