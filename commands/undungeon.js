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
    .setName("undungeon")
    .setDescription("Gets someone out of the dungeon")
    .addUserOption(option =>
        option.setName("minion")
        .setDescription("The minion to get out of the dungeon")
        .setRequired(true))
    .setDefaultMemberPermissions(1099511627776),

    /**
     * It's a function that is called when the command is executed.
     * @param {Discord.CommandInteraction<Discord.CacheType>} interaction 
     * @param {Client} client
     * @returns nuthin
     */
    async execute(interaction, client) {
		// Gets the snowflake of the user
        let minionSnowflake = interaction.options.get("minion")?.value;

        /* It's checking if the snowflake is undefined, if it is, it logs it to the console and
        returns. */
        if (minionSnowflake === undefined) {
            console.error(dateNow() + "undefined snowflake");
            return;
        }

        /* It's getting the member object from the snowflake. */
        let minion = client.guilds.resolve(guildId).members.resolve(minionSnowflake.toString())

        /* It's checking if the member object is null, if it is, it sends a message to the user and
        returns. */
        if (minion === null) {
            interaction.reply({
                content: "Not a valid minion!",
                ephemeral: true
            });
            return;
        }

        /* It's checking if the member has the dungeon role, if they do, it removes it, if they don't,
        it sends a message saying they aren't in the dungeon. */
        if (!minion.roles.cache.has(dungeonRole)) {
            interaction.reply({
                content: minion.displayName + " Isn't in the dungeon, use /dungeon to send them in it!",
                ephemeral: true
            });
        } else {
            minion.roles.remove(dungeonRole).then((minion) => {
                interaction.reply({
                    content: "Got " + minion.displayName + " out of the dungeon! They better behave now...",
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
	},
};
