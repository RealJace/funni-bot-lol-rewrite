const Eris = require("eris");

module.exports = {
	name: "vote",
	description: "vote for me on top.gg",
	options: [],
	async execute(interaction) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;

    interaction.createMessage("vote for me on top.gg",{
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              url: "https://top.gg/bot/889926710848540704/vote",
              label: "vote"
            }
          ]
        }
      ]
    })
	}
}
