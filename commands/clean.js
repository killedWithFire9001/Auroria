exports.desc = "Clean up bot messages";
exports.syntax = "clean"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  var bot = main.bot;

  if (!msg.guild.member(msg.author).hasPermission("MANAGE_MESSAGES")) {
    msg.channel.sendMessage("You can not use this command: You lack the Manage Messages permission.");
    return;
  }

  msg.channel.fetchMessages({
    limit: 100
  }).then(messages => {
    let msgfilter = messages.filter(e => e.author.id == bot.user.id);

    if (msgfilter !== null || msgfilter !== undefined) {
      msg.channel.bulkDelete(msgfilter)
        .then(msg.channel.sendMessage("Deleted " + msgfilter.size + " messages sent from the Bot."))
        .catch(err => msg.channel.sendMessage('Caught Error: `' + err + '`'));
    }
  });
}