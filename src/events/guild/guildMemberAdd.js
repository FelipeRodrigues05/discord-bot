const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const db = require("quick.db")

module.exports = (client, member) => {

    const guild = client.guilds.cache.get(message.guild.id);

    // EMOJIS //
    const GatinhoEmoji = client.emojis.cache.find(emoji => emoji.name === "gatinho");
    const olaEmoji = client.emojis.cache.find(emoji => emoji.name === "a_ola");
    const RuleEmoji = client.emojis.cache.find(emoji => emoji.name === "regras")

    // WELCOME //
    let autorole = db.get(`autorole_${message.guild.id}`)
    if(!autorole === null) return;
    member.roles.add(autorole)

    // guild.channels.cache.get(client.config.WelcomeChannelID).send(
    //     `${olaEmoji} **Bem vindo(a) ao Lions City RP** ${member.user.username} ${olaEmoji}\n${RuleEmoji}Passe em <#${client.config.RulesChannelID}> para ler as regras }\n${GatinhoEmoji}Passe em <#${client.config.WhitelistChannelID}> para iniciar o processo de whitelist${GatinhoEmoji}`).then(msg => msg.delete({ timeout: 9000 }));

    // // LOGS //
    // let WelcomeLogEmbed = new MessageEmbed()
    //     .setTitle(member.guild.name)
    //     .setDescription("Informações do membro")
    //     .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    //     .addFields(
    //         { name: `Usuário`, value: `${member}`, inline: true},
    //         { name: `Tag`, value: `${member.user.discriminator}`, inline: true},
    //         { name: `É Bot?`, value: `${member.user.bot}`, inline: true},
    //         { name: `Entrou em`, value: `${moment(member.joinedAt).format("DD/MM/YYYY - HH:mm")}`, inline: true},
    //         { name: `Criado em`, value: `${moment(member.user.createdAt).format("DD/MM/YYYY - HH:mm")}`, inline: true}
    //     )
    //     .setFooter(`${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    //     .setColor("GREEN")
    //     .setTimestamp()

    // guild.channels.cache.get(client.config.EnterLogsID).send(WelcomeLogEmbed);
}