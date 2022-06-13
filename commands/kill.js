const { SlashCommandBuilder  } = require('@discordjs/builders');
const { guildId } = require("../config.json");
const Discord = require("discord.js");
const Discordx = require("discordx");

// Redeclares Client in order to add a collection of commands
// Seems complicated but it's just long type names so that intellisense understands it
class Client extends Discordx.Client {
    commands = new Discord.Collection();
}

module.exports = {
	data: new SlashCommandBuilder()
    .setName("kill")
    .setDescription("Stops the bot")
    .setDefaultMemberPermissions(32),

    /**
     * 
     * @param {Discord.CommandInteraction<Discord.CacheType>} interaction the interaction object called
     * @param {Client} client
     * @returns nuthin
     */
	async execute(interaction, client) {
		await interaction.reply({
            content: "Logging off!",
            ephemeral: true
        });
        client.destroy();
        console.log(`Bot killed by ${interaction.user.username} using /kill`);
        process.exit(0);
	},
};
