const { SlashCommandBuilder  } = require('@discordjs/builders');
const { guildId } = require("../config.json");
const Discord = require("discord.js");
const Discordx = require("discordx");

// Redeclares Client in order to add a collection of commands
class Client extends Discordx.Client {
    commands = new Discord.Collection();
}

module.exports = {
	/* It's creating a new slash command. */
    data: new SlashCommandBuilder()
    .setName("kill")
    .setDescription("Stops the bot")
    .setDefaultMemberPermissions(32),

    /**
     * It's a function that is called when the command is executed.
     * @param {Discord.CommandInteraction<Discord.CacheType>} interaction the interaction object called
     * @param {Client} client
     * @returns nuthin
     */
    async execute(interaction, client) {
		/* It's sending a message to the user who executed the command. */
        await interaction.reply({
            content: "Logging off!",
            ephemeral: true
        });
        
        /* It's destroying the client, logging the user who killed the bot, and exiting the process. */
        client.destroy();
        console.log(`Bot killed by ${interaction.user.username} using /kill`);
        process.exit(0);
	},
};
