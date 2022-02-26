const { MessageEmbed, Message, User } = require("discord.js");

module.exports.run = async(client, message, args) => {
    // BAN //
    message.delete();
    const guild = client.guilds.cache.get(message.guild.id);

    let UserTarget = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Sem Motivos";

    // EMOJIS //
    const alertarainbow = client.emojis.cache.find(emoji => emoji.name === "alertarainbow");
    const negative = client.emojis.cache.find(emoji => emoji.name === "negative");
    const aban = client.emojis.cache.find(emoji => emoji.name === "aban");
    const users = client.emojis.cache.find(emoji => emoji.name === "users");
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

    const ERREmbed = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(` ${negative}| Erro`)
        .setDescription(`${alertarainbow} | Usuário não **encontrado**`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    const NotMentionedEmbed = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(` ${negative}| Erro`)
        .setDescription(`${alertarainbow} | Usuário não **mencionado**`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    const WithoutPerm = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(` ${negative}| Erro`)
        .setDescription(`${alertarainbow} | Não tenho permissão para banir esse membro`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    const DMEmbed = new MessageEmbed()
        .setTitle(`${aban} | Você foi banido(a)`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields(
            { name: `${users} Servidor`, value: `${message.guild.name}`, inline: true },
            { name: `${brilhopreto} Motivo`, value: `${reason}`, inline: true }
        )
        .setColor("RED")
        .setTimestamp()
        .setFooter(guild.name, message.guild.iconURL({dynamic : true}))

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(message.author, permErr).then(msg => msg.delete({ timeout: 9000 }));
    
    if(!args[0]) return message.channel.send(message.author, ERREmbed).then(msg => msg.delete({ timeout: 9000 }));

    if(!UserTarget) return message.channel.send(message.author, NotMentionedEmbed).then(msg => msg.delete({ timeout: 9000 }));

    if(!UserTarget.bannable) return message.channel.send(message.author, WithoutPerm).then(msg => msg.delete({ timeout: 9000 }));

    const banEmbed = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setTitle(`${aban} | Banimento`)
        .setThumbnail(UserTarget.user.displayAvatarURL( {dynamic: true} ))
        .addFields(
            { name: `${badgeModerator} Moderador`, value: `${message.author}`, inline: true },
            { name: `${config1} Punido`, value: `${UserTarget.user.username}`, inline: true },
            { name: `${brilhopreto} Motivo`, value: `${reason}` }
        )
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL( { dynamic: true } ))

    // LOGS //
    const BanLogEmbed = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setTitle(`${aban} | Banimento`)
        .setThumbnail(UserTarget.user.displayAvatarURL( {dynamic: true} ))
        .addFields(
            { name: `${badgeModerator} Moderador`, value: `${message.author}`, inline: true },
            { name: `${config1} Punido`, value: `${UserTarget.user.username} \n(${UserTarget.id})`, inline: true },
            { name: `${brilhopreto} Motivo`, value: `${reason}` }
        )
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL( { dynamic: true } ))

    await UserTarget.send(DMEmbed);
    await UserTarget.ban({
        reason: reason
    });
    message.channel.send(banEmbed).then(msg => msg.delete({ timeout: 9000 }));
    guild.channels.cache.get(client.config.BanLogsID).send(BanLogEmbed);
}