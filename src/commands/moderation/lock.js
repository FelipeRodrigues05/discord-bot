const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {

    message.delete();
    const guild = client.guilds.cache.get(message.guild.id);

    // EMOJIS //
    const alertarainbow = client.emojis.cache.find(emoji => emoji.name === "alertarainbow");
    const negative = client.emojis.cache.find(emoji => emoji.name === "negative");
    const affirmative = client.emojis.cache.find(emoji => emoji.name === "affirmative");

    const permErr = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(` ${negative}| Erro`)
        .setDescription(`${alertarainbow} | Você precisa da permissão de **GERENCIAR MENSAGENS** para usar esse comando`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    const lockEmbed = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setTitle(`:lock: Chat Trancado`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setDescription(` ${affirmative} | Chat lockado, utilize **${client.config.prefix}unlock** para desbloquear!`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL( { dynamic: true } ))

    
    let memberPerm = message.member.hasPermission("MANAGE_GUILD");
    
    if(!memberPerm) return message.channel.send(permErr);

    let lock = await message.channel.updateOverwrite(message.guild.roles.cache.find(role => role.name.toLowerCase().trim() == "@everyone"), {
        SEND_MESSAGES: false
    });

    message.channel.send(lockEmbed);
}