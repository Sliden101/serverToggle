// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config.json');
//Ptero api
const Pterodactyl = require('pterodactyl.js');
const pteroClient = new Pterodactyl.Builder()
	.setURL('https://panel.skynode.pro')
	.setAPIKey(config.apiKey)
	.asUser();

// Create a new client instance
const client = new Client({
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	]
  });
// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});
client.on('interactionCreate', async interaction => {

	const { commandName } = interaction;

	if (commandName === 'start') {
		pteroClient.getClientServers().then(async servers => {
			let server = servers[0];
			await server.start();
		}).catch(error => console.log(error));
		await interaction.reply('Started the server!');
	} else if (commandName === 'stop') {
		pteroClient.getClientServers().then(async servers => {
			let server = servers[0];
			await server.stop();
		}).catch(error => console.log(error));
		await interaction.reply('Stopped the server.');
	} else if (commandName === 'kill') {
		pteroClient.getClientServers().then(async servers => {
			let server = servers[0];
			await server.kill();
		}).catch(error => console.log(error));
		await interaction.reply('Killed the server.');
	} else if (commandName === 'renew') {
		await interaction.reply('Renew the server at https://skynode.gg/cum');
	}
});
// Login to Discord with your client's token
client.login(config.token);