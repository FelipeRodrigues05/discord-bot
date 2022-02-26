const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {

    message.delete();
    const guild = client.guilds.cache.get(message.guild.id);

    let Numeros = args[0];

    // EMOJIS //
    const alertarainbow = client.emojis.cache.find(emoji => emoji.name === "alertarainbow");
    const negative = client.emojis.cache.find(emoji => emoji.name === "negative");
    const affirmative = client.emojis.cache.find(emoji => emoji.name === "affirmative");
    const brilhopreto = client.emojis.cache.find(emoji => emoji.name === "brilhopreto");

    const permErr = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(` ${negative}| Erro`)
        .setDescription(`${alertarainbow} | Você precisa da permissão de **GERENCIAR MENSAGENS** para usar esse comando`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    const ErroMensagemDeletadaEmbed = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(` ${negative}| Erro`)
        .setDescription(`${alertarainbow} | Insira um valor de 1 a 100`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    const Sucesso = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RANDOM")
        .setTitle(` ${affirmative}| Limpeza Realizada`)
        .setDescription(` ${brilhopreto} | ${message.author} apagou ${Numeros} mensagens!`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(permErr).then(msg => msg.delete({ timeout: 9000 }));

    const ContadorMsgDeletada = parseInt(args[0], 10);

    if(!ContadorMsgDeletada || ContadorMsgDeletada < 1 || ContadorMsgDeletada > 100) return message.channel.send(ErroMensagemDeletadaEmbed);

    const ApagarMsg = await message.channel.messages.fetch({
        limit: ContadorMsgDeletada +1
    });
    message.channel.bulkDelete(ApagarMsg);

    message.channel.send(Sucesso).then(msg => msg.delete({ timeout: 9000 }));
}