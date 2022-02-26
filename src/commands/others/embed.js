const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {
    message.delete();
    const guild = client.guilds.cache.get(message.guild.id);

    let text = args.slice(0).join(" ");
    if(!text) text = "Insira um texto aqui";

    const embed = new MessageEmbed()
        .setAuthor(`${guild.name}`, message.guild.iconURL({ dynamic: true }))
        .setColor("RANDOM")  
        .setDescription(text)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    message.channel.send(embed);
}