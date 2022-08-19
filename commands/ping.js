const Eris = require("eris");

module.exports = {
	name: "ping",
	description: "gain my latency",
	options: [],
	async execute(interaction) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;
	}
}