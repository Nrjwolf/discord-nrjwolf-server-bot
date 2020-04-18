const LOGCHAT_ID = process.env.LOGCHAT_ID;
var client;

function init(_client) {
    client = _client;
}

function logChat(message) {
    client.channels.cache.get(LOGCHAT_ID).send(message);
}

module.exports = {
    init: init,
    logChat: logChat,
}