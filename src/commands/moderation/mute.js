const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports.run = async(client, message, args) => {

    message.delete();
    const guild = client.guilds.cache.get(message.guild.id);

    const permErr = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(`Erro`)
        .setDescription("Você precisa da permissão de **GERENCIAR MENSAGENS** para usar esse comando")
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    const MemberNotFoundEmbed = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(`Erro`)
        .setDescription("Usuário não encontrado")
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    const MuteRoleNotFound = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(`Erro`)
        .setDescription("O Cargo de **MUTADO** não foi encontrado, criando cargo de mute...")
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    const MuteRoleCreated = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(`Erro`)
        .setDescription("O Cargo de **MUTADO** foi criado com sucesso!")
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(permErr).then(msg => msg.delete({ timeout: 9000 }));

    const Membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!Membro) return message.channel.send(MemberNotFoundEmbed).then(msg => msg.delete({ timeout: 9000 }));

    let MuteRole = message.guild.roles.cache.get(client.test.MuteRoleID);
    if(!MuteRole) {
        try {
            message.channel.send(MuteRoleNotFound);

            let muteRole = await message.guild.roles.create({
                data : {
                    name: "Mutado",
                    permissions: []
                }
            });
            message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                await channel.createOverwrite(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                })
            });
            message.channel.send(MuteRoleCreated);
        } catch (error) {
            console.log(error);
        }
    };
    const AlreadyMuted = new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setColor("RED")
        .setTitle(`Erro`)
        .setDescription(`${Membro.displayName} já está mutado`)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()

    let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === "Mutado");
    if(Membro.roles.cache.has(role2.id)) return message.channel.send(AlreadyMuted).then(msg => msg.delete({ timeout: 9000 }));

    await Membro.roles.add(role2)

}