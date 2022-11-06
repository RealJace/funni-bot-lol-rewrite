
const Eris = require("eris");
const { Canvas } = require("canvacord");

module.exports = {
	name: "image",
	description: "manipulate your image",
	options: [
		{
			type: 1,
			name: "trigger",
			description: "make your/other user's profile picture triggered",
			options: [
				{
					type: 6,
					name: "user",
					description: "user you want to make triggered"
				}
			]
		},
		{
			type: 1,
			name: "jail",
			description: "make your/other user's profile picture go to jail",
			options: [
				{
					type: 6,
					name: "user",
					description: "user you want to put in jail"
				}
			]
		}
	],
	async execute(interaction,client) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;

		console.log(interaction.data.options[0]);
		
		var user = interaction.member.user;

		if ((interaction.data.options[0].options[0]) && client.users.has(interaction.data.options[0].options[0].value) !== null) {
			user = client.users.get(interaction.data.options[0].options[0].value);
		}
		
		const avatar = user.dynamicAvatarURL("png")
		
		if (interaction.data.options[0].name === "trigger") {
			const image = await Canvas.trigger(avatar)
			interaction.createMessage("",[
				{
					name: "triggered.gif",
					file: image
				}
			])
		}

		if (interaction.data.options[0].name === "jail") {
			const image = await Canvas.jail(avatar)
			interaction.createMessage("",[
				{
					name: "jail.png",
					file: image
				}
			])
		}
	}
}