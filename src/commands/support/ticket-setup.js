const { MessageEmbed } = require("discord.js");
const enmap = require("enmap")

module.exports.run = async(client, message, args) => {

    message.delete()

    const settings = new enmap({
        name: "settings",
        autoFetch: true,
        cloneLevel: "deep",
        fetchAll: true
    });

    const guild = client.guilds.cache.get(message.guild.id);
    // EMOJIS //
    const Estrelinhas = client.emojis.cache.find(emoji => emoji.name === "Purpleestrelas");
    const Configuracao = client.emojis.cache.find(emoji => emoji.name === "loading");
    const VerificadoPreto = client.emojis.cache.find(emoji => emoji.name === "VerificadoPreto");
    const a_ola = client.emojis.cache.find(emoji => emoji.name === "a_ola");
    const guide = client.emojis.cache.find(emoji => emoji.name === "guide");
   
    const ticketEmoji = "🎫";

    let ticketChannel = message.mentions.channels.first();
    if(!ticketChannel) return message.reply("`lcr.ticket-setup #canal`");

    let ticketEmbed = await ticketChannel.send(new MessageEmbed()
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setTitle("🎫 | Sistema de ticket")
        .setDescription(`${Estrelinhas}Reaja para abrir um ticket! ${Estrelinhas}`)
        .setFooter(client.user.username, message.guild.iconURL({dynamic : true}))
        .setColor("RANDOM")
        .setTimestamp()
    );
    ticketEmbed.react(ticketEmoji);
    settings.set(`${message.guild.id}-ticket`, ticketEmbed.id);

    const ticketConfigEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(guild.name, message.guild.iconURL({dynamic : true}))
        .setTitle(`${Configuracao} | Configuração`)
        .setDescription(`${VerificadoPreto} | Sistema de ticket configurado!`)
        .setFooter(client.user.username, message.guild.iconURL({dynamic : true}))

    message.channel.send(ticketConfigEmbed).then(msg => msg.delete({ timeout: 9000 }));

    client.on('messageReactionAdd', async (reaction, user) => {
          if(user.partial) await user.fetch();
          if(reaction.partial) await reaction.fetch();
          if(reaction.message.partial) await reaction.message.fetch();
      
          if(user.bot) return;
      
          let feeh = await settings.get(`${reaction.message.guild.id}-ticket`);
      
          if(!feeh) return;
      
          if(reaction.message.id == feeh && reaction.emoji.name == ticketEmoji) {
              reaction.users.remove(user);
      
              reaction.message.guild.channels.create(`ticket-${user.username}`, {
                  permissionOverwrites: [
                      {
                          id: user.id,
                          allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                      },
                      {
                          id: reaction.message.guild.roles.everyone,
                          deny: ["VIEW_CHANNEL"]
                      }
                  ],
                  type: 'text'
              }).then(ch => {
                  let category = guild.channels.cache.find(cat => cat.name == "📞 SUPORTE" && cat.type == "category")

                  if(!category) throw new Error("Categoria não existe")
                  ch.setParent(category.id)

                    ch.send(`<@${user.id}>`, new MessageEmbed()
                        .setTitle(`${a_ola} | Boas vindas ao seu ticket`)
                        .setDescription(`${guide} | Utilize **${client.config.prefix}close** para encerrar o seu ticket`)
                        .setColor("RANDOM")
                        .setFooter(client.user.username, message.guild.iconURL({dynamic : true})))               
              })
          }
      });
}