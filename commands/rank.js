const Eris = require("eris");
const canvacord = require("canvacord");
const data = require("../data.js");

module.exports = {
	name: "rank",
	description: "check your current xp and level",
	options: [],
	async execute(interaction,client) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;

		const userData = data.get()[interaction.member.id];

		const rank = new canvacord.Rank();
		rank.setAvatar(interaction.member.user.dynamicAvatarURL("png"));
		rank.setCurrentXP(userData.xp);
		rank.setRequiredXP(userData.level * 10);
		rank.setProgressBar("#FFFFFF", "COLOR");
		rank.setUsername(interaction.member.user.username);
    rank.setDiscriminator(interaction.member.user.discriminator);

		const rankCardData = await rank.build();

		interaction.createMessage("",[
			{
				name: "rankcard.png",
				file: rankCardData
			}
		])

	}
}
