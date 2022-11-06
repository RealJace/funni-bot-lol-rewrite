
const Eris = require("eris");
const data = require("../data.js");

module.exports = {
	name: "bal",
	description: "check your current cash and money in bank",
	options: [],
	async execute(interaction) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;
		const userData = data.get()[interaction.member.id];

		let embed = {
			title: "your balance",
			fields: [
				{
					name: "cash",
					value: `$${userData.cash.toString()}`
				},
				{
					name: "bank",
					value: `$${userData.bank.toString()}`
				}
			]
		}
		
		interaction.createMessage({
			embeds: [embed]
		});
	}
}