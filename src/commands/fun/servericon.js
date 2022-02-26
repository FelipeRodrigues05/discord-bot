const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    let member = message.author;

    message.delete();
    const guild = client.guilds.cache.get(message.guild.id);
    const memberIcon = member.displayAvatarURL( {dynamic: true, size: 2048} );
    const guildIcon = guild.iconURL( {dynamic: true, size: 2048} );

    const siEmbed = new Discord.MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setAuthor(`${guild.name}`)
        .setColor('RANDOM')
        .setImage(guildIcon)
        .setFooter(`Requisitado por: ${member.username}`, memberIcon)

        message.channel.send(siEmbed).then(msg => msg.delete({ timeout: 10000 }));
}