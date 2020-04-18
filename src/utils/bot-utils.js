const LOGCHAT_ID = process.env.LOGCHAT_ID;
var client;

const config = require('../../config.json');

function init(_client, config) {
    client = _client;
}

function logChat(message) {
    client.channels.cache.get(LOGCHAT_ID).send(message);
}

function getCommand(message) {
    var command = {
        text: '',
        args: [0],
    }
    if (!message.content.startsWith(config.prefix)) return command;
    const withoutPrefix = message.content.slice(config.prefix.length);
    const split = withoutPrefix.split(/ +/);
    command.text = split[0];
    command.args = split.slice(1);
    return command;
}

module.exports = {
    init: init,
    logChat: logChat,
    getCommand: getCommand,
}