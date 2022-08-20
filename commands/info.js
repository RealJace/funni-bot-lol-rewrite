const Eris = require("eris");

module.exports = {
	name: "info",
	description: "info about me",
	options: [],
	async execute(interaction) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;

		let embed =	{
      title: `about funni bot lol`,
      description: `these are various informations about funni bot lol`,
      color: 0x769fff,
      fields: [
        {
          name: `in what programming language is fbl written in?`,
          value: `node.js and eris library`,
          inline: true
        },
        {
          name: `why should i pick you instead of dank memer?`,
          value: `some dank memer's features are locked behind a paywall, fbl's features are all free and theres optional donation`,
          inline: true
        },
        {
          name: `what is this bot?`,
          value: `fun and economy bot`,
          inline: true
        },
        {
          name: `why did you pick a name funni bot lol?`,
          value: `since im unoriginal i just smashed words that describe what the bot is about, its funni bot and i just added lol`,
					inline: true
        }
      ]
    }

		interaction.createMessage({
			embeds = [embed],
			components = [
		    {
		      type: 1,
		      components: [
		        {
		          style: 5,
		          label: `top.gg link`,
		          url: `https://top.gg/bot/889926710848540704`,
		          disabled: false,
		          type: 2
		        }
		      ]
		    }
		  ]
		})
	}
}
