const Pterodactyl = require('pterodactyl.js');
const config = require('./config.json')
const client = new Pterodactyl.Builder()
    .setURL('https://panel.skynode.pro')
    .setAPIKey(config.apiKey)
    .asUser();

client.getClientServers().then(async servers => {
    let server = servers[0];

    console.log(server.toJSON());

    await server.start();
}).catch(error => console.log(error));