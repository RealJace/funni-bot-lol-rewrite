const Eris = require("eris");
const data = require("../data.js");

module.exports = {
	name: "withdraw",
	description: "withdraw your money from from bank",
	options: [
		{
			type: 4,
			name: "cash",
			description: "amount of cash you want to withdraw",
			required: true
		}
	],
	async execute(interaction) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;

		const userData = data.get()[interaction.member.id];

		const cashToWithdraw = interaction.data.options[0].value;

		if (cashToWithdraw > userData.bank) {
			return interaction.createMessage(`you don't have $${cashToWithdraw.toString()} in your bank`);
		}

		userData.cash += cashToWithdraw;
		userData.bank -= cashToWithdraw;

		const newData = data.get();
		newData[interaction.member.id] = userData;

		data.set(newData);

		interaction.createMessage(`sucessfully withdrawed $${cashToWithdraw}`);

	}
}