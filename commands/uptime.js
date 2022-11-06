
const Eris = require("eris");

module.exports = {
	name: "uptime",
	description: "check my uptime",
	options: [],
	async execute(interaction,client) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;

    interaction.createMessage(`${Math.floor(client.uptime / 60000).toString()}m ${Math.floor(client.uptime / 1000).toString()}s`)
	}
}
