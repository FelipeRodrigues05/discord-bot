const Discord = require("discord.js");
const { readdirSync } = require("fs");
const client = new Discord.Client({partials: ["MESSAGE", "USER", "REACTION",]});
const config = require("./config.json");
const chalk = require("chalk")
const enmap = require('enmap');

client.config = config;

const eventsFolder = readdirSync(`./src/events/`)

eventsFolder.forEach(evtFolder => {
    const eventsFile = readdirSync(`./src/events/${evtFolder}/`).filter(f => f.endsWith(".js"))
    eventsFile.forEach(file => {
        const event = require(`./src/events/${evtFolder}/${file}`);
        let eventName = file.split(".")[0].trim()
        client.on(eventName, event.bind(null, client))
        console.log(chalk.blueBright(`Evento ${eventName} carregado`))
    })
})

client.commands = new Discord.Collection()

const commandsFolder = readdirSync(`./src/commands/`)

commandsFolder.forEach(cmdFolder => {
    const commandsFile = readdirSync(`./src/commands/${cmdFolder}`).filter(f => f.endsWith(".js"))
    commandsFile.forEach(file => {
        const command = require(`./src/commands/${cmdFolder}/${file}`)
        let commandName = file.split(".")[0]
        console.log(chalk.magentaBright(`Comando ${commandName} carregado`))
        client.commands.set(commandName, command)
    })
})

client.login(config.token);