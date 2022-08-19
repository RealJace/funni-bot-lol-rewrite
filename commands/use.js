const Eris = require("eris");
const data = require("../data.js");
const fs = require("fs");

module.exports = {
	name: "use",
	description: "use item you own",
	options: [
		{
			type: 3,
			name: "item",
			description: "item that you want to use (must own)",
			required: true
		}
	],
	async execute(interaction,client) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;

		const userData = data.get()[interaction.member.id];

		if (!userData.items.includes(interaction.data.options[0].value)) {
			interaction.createMessage(`you don't own ${interaction.data.options[0].value}`);
		}

		if (!fs.existsSync(`./items/${interaction.data.options[0].value}.js`)) {
			interaction.createMessage(`${interaction.data.options[0].value} doesn't exist`)
		}

		const item = require(`../items/${interaction.data.options[0].value}.js`);
		item.use(interaction,client)
		
	}
}