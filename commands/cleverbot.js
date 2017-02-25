exports.desc = "Talk to Cleverbot!";
exports.syntax = "cleverbot (talking stuff)"

exports.run = function (msg) {
  var main = require("../bot.js");
  var CBOT = main.CBOT;

  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;
      let args = msg.content.replace(main.cmd + "cleverbot ", "");

      if (args == null || args == "" || args == " " || args == main.cmd + "cleverbot") {
        msg.reply("Please specify something to ask Cleverbot.");
        return;
      }

      msg.channel.startTyping();

      CBOT.ask(args, function (err, response) {
        msg.channel.sendMessage(":speech_balloon: " + response);
        msg.channel.stopTyping();
        return;
      });
    });
}
