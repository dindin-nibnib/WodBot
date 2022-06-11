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
    .setName("dungeon")
    .setDescription("Sends someone to the dungeon")
    .addUserOption(option =>
        option.setName("minion")
        .setDescription("The minion to send to the dungeon")
        .setRequired(true)),

    /**
     * 
     * @param {Discord.CommandInteraction<Discord.CacheType>} interaction 
     * @param {Client} client
     * @returns nuthin
     */
	async execute(interaction, client) {
		// Gets the snowflake of the user
        let minionSnowflake = interaction.options.get("minion")?.value;
        if (minionSnowflake === undefined) {
            console.error(dateNow() + "undefined snowflake");
            return;
        }

        let minion = client.guilds.resolve(guildId).members.resolve(minionSnowflake.toString())
        if (minion === null) {
            interaction.reply({
                content: "Not a valid minion!",
                ephemeral: true
            });
            return;
        }

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
	},
};
