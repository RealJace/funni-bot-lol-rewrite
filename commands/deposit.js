const Eris = require("eris");
const data = require("../data.js");

module.exports = {
	name: "deposit",
	description: "deposit money in your bank",
	options: [
		{
			type: 4,
			name: "cash",
			description: "amount of cash you want to deposit",
			required: true
		}
	],
	async execute(interaction) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;

		const userData = data.get()[interaction.member.id];

		const cashToDeposit = interaction.data.options[0].value;

		if (cashToDeposit > userData.cash) {
			return interaction.createMessage(`you don't have $${cashToDeposit.toString()} to deposit`);
		}

		userData.cash -= cashToDeposit;
		userData.bank += cashToDeposit;

		const newData = data.get();
		newData[interaction.member.id] = userData;

		data.set(newData);

		interaction.createMessage(`sucessfully deposited $${cashToDeposit}`);
	}
}