const chalk = require("chalk")

module.exports = (client) => {
    console.log(chalk.green(`Pronto!`));
    
    let activities = [
        `Use lcr.help para obter ajuda`,
        `Desenvolvido por ! Feh 合#0001`,
        `Melhor servidor de MTA do momento`,
        `Lions City no Topo`
    ];
    i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "WATCHING" }), 9000);
}
