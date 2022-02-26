const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    let member = message.author;

    message.delete();
    const guild = client.guilds.cache.get(message.guild.id);
    const memberIcon = member.displayAvatarURL( {dynamic: true, size: 2048} );
    const guildIcon = guild.iconURL( {dynamic: true} );

    const serverinfoEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${guild.name}`, message.guild.iconURL({ dynamic: true }))
        .setThumbnail(guildIcon)
        .addFields (
            { name: ":computer: ID do servidor ", value: `${guild.id}`, inline: true },
            { name: ":crown: Posse", value:  `<@${guild.ownerID}> \n (${guild.ownerID})`, inline: true }
        )
        .addField(":earth_americas: Região ", guild.region, true)
        .addField(":date: Criado em", `${moment(guild.createdAt).format("DD/MM/YYYY - HH:mm")}`, true)
        .addField(":star2: Entrei aqui em ", `${moment(client.joinedAt).format("DD/MM/YYYY - HH:mm")}`, true)
        .addField(":busts_in_silhouette: Membros ", guild.memberCount, true)
        .setFooter(`Requisitado por: ${member.username}`, memberIcon)

        message.channel.send(serverinfoEmbed).then(msg => msg.delete({ timeout: 10000 }));
}