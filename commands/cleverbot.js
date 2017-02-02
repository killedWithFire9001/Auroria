exports.desc = "Talk to Cleverbot!";
exports.syntax = "cleverbot (talking stuff)"

exports.run = function(msg) {
  var main = require("C:/BOT/bot.js");
  var CBOT = main.CBOT;

  console.log(`${msg.author.username} has attempted to use the Cleverbot command on ${msg.channel.guild.name}`);

  let args = msg.content.replace(main.cmd + "cleverbot ", "");

  if (args == null || args == "" || args == " " || args == main.cmd + "cleverbot") {
    msg.reply("Please specify something to ask Cleverbot.");
    return;
  }

  msg.channel.startTyping();

  CBOT.ask(args, function(err, response) {
    msg.channel.sendMessage(":speech_balloon: " + response);
    msg.channel.stopTyping();
    return;
  });
}
