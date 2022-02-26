const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {

    message.delete();
    const guild = client.guilds.cache.get(message.guild.id);

    // EMOJIS //
    const alertarainbow = client.emojis.cache.find(emoji => emoji.name === "alertarainbow");
    const affirmative = client.emojis.cache.find(emoji => emoji.name === "affirmative");
    const negative = client.emojis.cache.find(emoji => emoji.name === "negative");

    const permErr = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(` ${negative}| Erro`)
        .setDescription(`${alertarainbow} | Você precisa da permissão de **BANIR MEMBROS** para usar esse comando`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    const unlockEmbed = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setTitle(`:unlock: Chat Destrancado`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setDescription(`${affirmative} | Chat Desbloqueado`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL( { dynamic: true } ))
    
    let memberPerm = message.member.hasPermission("MANAGE_GUILD");
    
    if(!memberPerm) return message.channel.send(permErr);

    let unlock = await message.channel.updateOverwrite(message.guild.roles.cache.find(role => role.name.toLowerCase().trim() == "@everyone"), 
    {
        SEND_MESSAGES: true
    });

    message.channel.send(unlockEmbed).then(msg => msg.delete({ timeout: 9000 }));
}