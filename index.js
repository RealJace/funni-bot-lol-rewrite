require("dotenv").config()

const path = require("path");
const fs = require("fs")
const Eris = require("eris");
const express = require("express");
const axios = require("axios");

const data = require("./data.js")

const app = express();

const client = new Eris(process.env.DISCORD_TOKEN,{
	intents: 32767
});

var commands = {};
var commandsArray = [];

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	commands[command.name] = command
	commandsArray.push(command)
}

function setStatus() {
	client.editStatus("online",{
		name: `${client.guilds.size} servers`,
		type: 3
	})
}

client.on("ready",async () => {

	if (process.env.LOG_GUILDS === "True") {
		client.guilds.forEach(async function(element) {
		try {
			var guildInvites = await client.getGuildInvites(element.id)
			for (const invite of guildInvites) {
				console.log(`${element.name}: ${invite.code}`)
			}
		} catch (err) {
			console.log(err);
		}
	});
	}

	setStatus()

	setInterval(setStatus,500)

	if (process.env.GUILD_COMMANDS === "False") {
		await client.bulkEditCommands(commandsArray);
		console.log("Registered commands globally.");
	} else {
		await client.bulkEditGuildCommands(process.env.GUILD,commandsArray);
		console.log("Registered commands in guild.");
	}

	console.log("Bot is ready.")
})

client.on("error",(error) => {
	console.log(error);
})

client.on("interactionCreate",async interaction => {
	if (interaction instanceof Eris.CommandInteraction) {

		if (!interaction.guildID) return interaction.createMessage("this bot is designed to be used in guilds, so use me in guilds please");

		var oldData = data.get();

		if (interaction.member !== undefined) {
			if (oldData[interaction.member.id] === null || oldData[interaction.member.id] === undefined) {
				oldData[interaction.member.id] = {};
				oldData[interaction.member.id].cash = 0;
				oldData[interaction.member.id].bank = 1000;
				oldData[interaction.member.id].items = [];
			}
		}

		data.set(oldData);

		if (commands[interaction.data.name]) {
			try {
				await commands[interaction.data.name].execute(interaction,client);
			} catch (err) {
				console.log(err);
				await interaction.createMessage("```" + err + "```");
			}
		}
	}

	if (interaction instanceof Eris.ComponentInteraction) {
		if (interaction.data.component_type === 2 && interaction.data.custom_id.includes("anothermeme_")) {

			var subreddit = interaction.data.custom_id.split("_")[1]

			if (subreddit !== undefined) {

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

				await interaction.acknowledge()

				interaction.editOriginalMessage({
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
	}
})

app.get("/",async (req,res) => {
	res.send("Bot is working.");
});

app.listen(3000,() => {
	console.log("Server is running.");
})

client.connect();
