const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, message, args) => {

    message.delete()
    const error = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({dynamic : true}))
    .setColor("RED")
    .setTitle(`Erro`)
    .setDescription("Você não pode utilizar esse comando aqui")
    .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
    .setTimestamp()


    if(!message.channel.name.includes("ticket-")) return message.channel.send(error).then(msg => msg.delete({ timeout: 9000 }));
    message.channel.delete();
}