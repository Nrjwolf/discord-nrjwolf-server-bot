require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const botUtils = require('./src/utils/bot-utils');

const BOT_TOKEN = process.env.BOT_TOKEN;
const BOT_ID = process.env.BOT_ID;

client.on('ready', () => {
    console.log(client);
    console.log(`Logged in as ${client.user.tag}!`);
    botUtils.init(client);
    botUtils.logChat("Hello, I'm alive!");
});

client.on('message', msg => {
    console.log(msg);

    // igoner bot messages
    if (msg.author.id == BOT_ID) return;

    // listen rivate messages 
    if (msg.channel.type == 'dm') {
        msg.reply('you stink 🤮');

    }
    // let guild = client.guilds.get('guild ID here'),
    //     USER_ID = '123123123';

    // if (guild.member(USER_ID)) {
    //     // there is a GuildMember with that ID
    // }
    // }
    // var role = msg.mentions.guild.roles.cache.find(x => x.name == 'test')
    // msg.member.roles.add(role);
});

client.login(BOT_TOKEN);