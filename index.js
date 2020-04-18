require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const botUtils = require('./src/utils/bot-utils');

const BOT_TOKEN = process.env.BOT_TOKEN;
const BOT_ID = process.env.BOT_ID;
const GUILD_ID = process.env.GUILD_ID;
const ROLE_ID = process.env.ROLE_ID;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(client);
    botUtils.init(client);
    botUtils.logChat("Hello, I'm alive!");

    client.user.setActivity("Unity"); // just for fun
});

client.on('message', message => {
    console.log(message);
    var author = message.author;

    // ignore bot messages
    if (author.id == BOT_ID) return;

    // listen private messages 
    if (message.channel.type === 'dm') {

        // Is user member of server
        let guild = client.guilds.cache.get(GUILD_ID);
        let memeber = guild.member(author.id);
        if (memeber) {

            //check command
            let command = botUtils.getCommand(message)
            if (command.text === config.commands.getRoleRu.text) {
                // assign role 'ru'
                let roleRu = guild.roles.cache.find(x => x.id === ROLE_ID);
                if (!memeber.roles.cache.find(x => x.id === ROLE_ID)) {
                    memeber.roles.add(roleRu);

                    message.reply(new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(config.reply.addRoleRu)
                    );
                }
                else {
                    message.reply(config.reply.alreadyHasRoleRu);
                }
            }
            else {
                message.reply(config.reply.idk);
            }
        }
        else {
            message.reply(config.reply.notMember);
        }
    }
});

client.login(BOT_TOKEN);