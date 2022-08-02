const { Routes } = require('discord-api-types/v9');
const {	SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('start').setDescription('Starts the terraria server.'),
	new SlashCommandBuilder().setName('stop').setDescription('Stops the terraria server.'),
	new SlashCommandBuilder().setName('kill').setDescription('Kills the terraria server.'),
    new SlashCommandBuilder().setName('renew').setDescription('Renew the terraria server.'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);