const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client, message, args) => {

    const guild = client.guilds.cache.get(message.guild.id);
    // EMOJIS //
    const alertarainbow = client.emojis.cache.find(emoji => emoji.name === "alertarainbow");
    const negative = client.emojis.cache.find(emoji => emoji.name === "negative");

    const cargoError = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(` ${negative}| Erro`)
        .setDescription(`${alertarainbow} | Lembre-se de mencionar o cargo`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    if (!args[0]) return message.channel.send(cargoError).then(msg => msg.delete({ timeout: 10000 }))

    let autoroleRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

    const cargoCorr = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(` ${negative}| Sucesso!`)
        .setDescription(`${alertarainbow} | O cargo ${autoroleRole} foi definido como autorole com sucesso!`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    db.set(`autorole_${message.guild.id}`, autoroleRole.id)

    message.channel.send(cargoCorr)

}