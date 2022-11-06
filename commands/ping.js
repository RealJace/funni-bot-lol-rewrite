
const Eris = require("eris");

module.exports = {
	name: "ping",
	description: "gain my latency",
	options: [],
	async execute(interaction,client) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;

		const guild = client.guilds.get(interaction.guildID)

		interaction.createMessage(`${guild.shard.latency}ms`)

	}
}
