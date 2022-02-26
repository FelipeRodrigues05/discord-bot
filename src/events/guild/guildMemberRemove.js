const { MessageEmbed } = require("discord.js");

module.exports = (client, member) => {
    const guild = client.guilds.cache.get(message.guild.id);

    // LOGS //
    let ExitLogEmbed = new MessageEmbed()
        .setTitle(member.guild.name)
        .setDescription(`${member.user.username} saiu do servidor`)
        .setColor("RED")
        .setTimestamp()

    guild.channels.cache.get(client.config.ExitLogsID).send(ExitLogEmbed);
}