const { MessageEmbed } = require("discord.js")

module.exports.run = (client, message, args) => {
    // Configs //
    message.delete();
    const guild = client.guilds.cache.get(message.guild.id);

    // EMOJIS //
    const on = client.emojis.cache.find(emoji => emoji.name === "on");
    const off = client.emojis.cache.find(emoji => emoji.name === "off");
    const loading = client.emojis.cache.find(emoji => emoji.name === "loading");

    let state = args.slice(0).join(" ");
    if (state == "on") state = `${on} Servidor Ligado`
    else if (state == "off") state = `${off} Servidor Desligado`

    const StateEmbed = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RANDOM")
        .setTitle(`${loading} Estado do Servidor`)
        .setDescription(`${state}`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    guild.channels.cache.get(client.config.StatusChannelID).send("@everyone", StateEmbed);

}