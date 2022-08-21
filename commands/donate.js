const Eris = require("eris");

module.exports = {
	name: "donate",
	description: "optional donation",
	options: [],
	async execute(interaction,client) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;

		interaction.createMessage({
      content: "",
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              url: "https://donatebot.io/checkout/1006237948083195944",
              label: "donate to help with development (optional)"
            }
          ]
        }
      ]
    })

	}
}
