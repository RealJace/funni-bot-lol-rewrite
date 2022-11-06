
const Eris = require("eris");
const axios = require("axios");

module.exports = {
	name: "meme",
	description: "get some sweet spicy memes on subreddit you desire",
	options: [
		{
			type: 3,
			name: "subreddit",
			description: "subreddit you desire",
			choices: [
				{
					name: "classic",
					value: "meme"
				},
				{
					name: "dank",
					value: "dankmeme"
				},
				{
					name: "programmers' humor",
					value: "ProgrammerHumor"
				}
			]
		}
	],
	async execute(interaction) {
		if (!(interaction instanceof Eris.CommandInteraction)) return;
		
		// interaction.data.options[0]

		var subreddit = "meme"

		if (interaction.data.options && interaction.data.options[0] !== undefined) {
			subreddit = interaction.data.options[0].value
		}
		
		const data = await axios.get(`https://meme-api.herokuapp.com/gimme/${subreddit}`)

		const meme = data.data
		
		var embed = {
			title: meme.title,
			description: `posted in r/${meme.subreddit}`,
			author: {
				name: `u/${meme.author}`,
				url: `https://www.reddit.com/user/${meme.author}`,
			},
			footer: {
				text: meme.ups,
				icon_url: "https://cdn3.emoji.gg/emojis/1375-upvote.png"
			},
			image: {
				url: meme.url
			},
			url: meme.postLink
		};
		
		interaction.createMessage({
			embeds: [embed],
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							label: "another meme",
							style: 1,
							custom_id: `anothermeme_${subreddit}`
						}
					]
				}
			]
		});
	}
}