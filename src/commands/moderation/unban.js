const { MessageEmbed, Message, User } = require("discord.js");

module.exports.run = async(client, message, args) => {
    // UNBAN //

    const guild = client.guilds.cache.get(message.guild.id);

    // EMOJIS //
    const alertarainbow = client.emojis.cache.find(emoji => emoji.name === "alertarainbow");
    const negative = client.emojis.cache.find(emoji => emoji.name === "negative");
    const aban = client.emojis.cache.find(emoji => emoji.name === "aban");
    const brilhopreto = client.emojis.cache.find(emoji => emoji.name === "brilhopreto");
    const badgeModerator = client.emojis.cache.find(emoji => emoji.name === "badgeModerator");
    const config1 = client.emojis.cache.find(emoji => emoji.name === "config");

    const permErr = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(` ${negative}| Erro`)
        .setDescription(`${alertarainbow} | Você precisa da permissão de **BANIR MEMBROS** para usar esse comando`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    const NotMentionedEmbed = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(` ${negative}| Erro`)
        .setDescription(`${alertarainbow} | Usuário não **mencionado**`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()


    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Sem Motivos";

    message.delete();

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(permErr).then(msg => msg.delete({ timeout: 9000 }));
        let UserTarget = args[0];

        if(!UserTarget) return message.channel.send(NotMentionedEmbed).then(msg => msg.delete({ timeout: 9000 }));

        const UnbanEmbed = new MessageEmbed()
            .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
            .setTitle(`${aban} | Desbanimento`)
            .setThumbnail(UserTarget.user.displayAvatarURL( {dynamic: true} ))
            .addFields(
                { name: `${badgeModerator} Moderador`, value: `${message.author}`, inline: true },
                { name: `${config1} Punido`, value: `${UserTarget.user.username}`, inline: true },
                { name: `${brilhopreto} Motivo`, value: `${reason}` }
            )
            .setColor("GREEN")
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL( { dynamic: true } ))
    
        message.guild.members.unban(UserTarget);
        message.channel.send(UnbanEmbed).then(msg => msg.delete({ timeout: 9000 }));

    // LOGS //
    const UnbanLogEmbed = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setTitle(`${aban} | Desbanimento`)
        .setThumbnail(UserTarget.user.displayAvatarURL( {dynamic: true} ))
        .addFields(
            { name: `${badgeModerator} Moderador`, value: `${message.author}`, inline: true },
            { name: `${config1} Punido`, value: `${UserTarget.user.username}`, inline: true },
            { name: `${brilhopreto} Motivo`, value: `${reason}` }
        )
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL( { dynamic: true } ))

    guild.channels.cache.get(client.config.BanLogsID).send(UnbanLogEmbed);

}