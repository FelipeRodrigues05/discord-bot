module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if(!cmd) return;
    cmd.run(client, message, args);

    const usersMap = new Map()
    const LIMIT = 5;
    const TIME = 5000
    const DIFF = 3000

    if(usersMap.has(message.author)) {
        const userData = usersMap.get(message.author.id)
        const { lastMessage, timer } = userData
        const difference = message.createdTimestamp - lastMessage.createdTimestamp
        let msgCount = userData.msgCount

        if(difference > DIFF) {
            clearTimeout(timer)
            userData.msgCount = 1
            userData.lastMessage = message
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id)
            }, TIME)
        } else {
            ++msgCount
            if(parseInt(msgCount) === LIMIT) {
                let muteRole = message.guild.roles.cache.find(role => role.name === "Mutado")
                if(!muteRole) {
                    try {
                        muteRole = await message.guild.roles.create({
                            name: "Mutado",
                            permissions: []
                        })
                        message.guild.channels.find,forEach(async (channel, id) => {
                            await channel.createOverwrite(muteRole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false
                            })
                        })
                    } catch (e) {
                        console.log(e)
                    }
                }
                message.member.roles.add(muteRole)
                message.channel.send("Você foi mutado")
                setTimeout(() => {
                    message.member.roles.remove(muterole)
                    message.channel.send("Você foi desmutado")
                }, TIME)
            } else {
                userData.msgCount = msgCount
                usersMap.set(message.author.id, userData)
            }
        }
    } else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id)
        }, TIME)
    }
    usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn
    })
}