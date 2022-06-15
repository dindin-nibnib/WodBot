/* It's just importing the modules that are needed for the command to work. */
const { SlashCommandBuilder  } = require('@discordjs/builders');
const { guildId } = require("../config.json");
const Discord = require("discord.js");
const Discordx = require("discordx");

/* It's a class that extends the Discord.js Client class, and adds a commands property to it. */
class Client extends Discordx.Client {
    commands = new Discord.Collection();
}

module.exports = {
	/* It's creating a new SlashCommandBuilder, and setting the name, description, and default
    permissions. */
    data: new SlashCommandBuilder()
    .setName("dungeon")
    .setDescription("Sends someone to the dungeon")
    .addUserOption(option =>
        option.setName("minion")
        .setDescription("The minion to send to the dungeon")
        .setRequired(true))
    .setDefaultMemberPermissions(1099511627776),

    /**
     * It's the code that runs when the command is executed.
     * @param {Discord.CommandInteraction<Discord.CacheType>} interaction 
     * @param {Client} client
     * @returns nuthin
     */
    async execute(interaction, client) {        
        /* It's getting the snowflake of the option "minion" from the interaction. */
        let minionSnowflake = interaction.options.get("minion")?.value;

        /* It's checking if the snowflake is undefined, and if it is, it's logging an error to the
        console, and returning. */
        if (minionSnowflake === undefined) {
            console.error(dateNow() + "undefined snowflake");
            return;
        }

        /* It's getting the member object from the user. */
        let minion = client.guilds.resolve(guildId).members.resolve(minionSnowflake.toString())
        /* It's checking if the member object is null, and if it is, it's replying to the user that the
        snowflake they provided is not a valid minion, and returning. */
        if (minion === null) {
            interaction.reply({
                content: "Not a valid minion!",
                ephemeral: true
            });
            return;
        }

        /* It's checking if the member has the dungeon role, and if they do, it's replying to the user
        that the member is already in the dungeon, and if they don't, it's adding the dungeon role
        to the member. */
        if (minion.roles.cache.has(dungeonRole)) {
            interaction.reply({
                content: minion.displayName + " already is in the dungeon, use /undungeon <member> to get them out!",
                ephemeral: true
            });
        } else {
            /* It's adding the dungeon role to the member, and then replying to the user that the
            member was sent to the dungeon. */
            minion.roles.add(dungeonRole).then((minion) => {
                interaction.reply({
                    content: "Sent " + minion.displayName + " to the dungeon! (bad minion!)",
                    ephemeral: true
                });
            })
            /* It's catching any errors that may occur when adding the dungeon role to the member, and
            replying to the user with the error. */
            .catch((err) => {
                interaction.reply({
                    content: "Couldn't get " + minion?.displayName + " to the dungeon, they're too strong... \n\n" + err,
                    ephemeral: true
                });
            });
        }
	},
};
