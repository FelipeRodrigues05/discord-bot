const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    let member = message.author;

    message.delete();
    const guild = client.guilds.cache.get(message.guild.id);
    const memberIcon = member.displayAvatarURL( {dynamic: true, size: 2048} );
    const guildIcon = guild.iconURL( {dynamic: true, size: 2048} );
    const ping = await message.channel.send("Pong!");
    ping.delete();

    const pingEmbed = new Discord.MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RANDOM")
        .setThumbnail(guildIcon)
        .addFields (
            { name: "🖥️ Ping do servidor ", value: `${ping.createdTimestamp - message.createdTimestamp}ms`, inline: true },
            { name: "⏲️ Ping da API", value: `${Math.round(client.ws.ping)}ms`, inline: true }
        )
        .setFooter(`Requisitado por: ${member.username}`, memberIcon)

        message.channel.send( pingEmbed ).then(msg => msg.delete({ timeout: 9000 }));

}