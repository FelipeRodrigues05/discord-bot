const { MessageEmbed } = require("discord.js")

module.exports.run = (client, message, args) => {
    message.delete();
    const guild = client.guilds.cache.get(message.guild.id);

    const WithoutText = new MessageEmbed()
        .setAuthor(`${guild.name}`, message.guild.iconURL({ dynamic: true }))
        .setColor("RANDOM")  
        .setDescription("Insira um texto")
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    let text = args.slice(0).join(" ");
    if(!text) return message.channel.send(WithoutText).then(msg => msg.delete({ timeout: 9000 }));

    message.channel.send(text);
}