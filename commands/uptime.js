const Eris = require("eris");

module.exports = {
	name: "uptime",
	description: "check my uptime",
	options: [],
	async execute(interaction,client) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;

    interaction.createMessage(`${(client.uptime / 1000).toString()} seconds`)
	}
}
