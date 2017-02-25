exports.desc = "Change the status message of the bot";
exports.syntax = "changestatus (args)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;
      let args = msg.content.replace(cmd + "changestatus ", "");
      var bot = main.bot;

      var isGlobalAdmin = false;

      length = main.globalAdmin.length;
      while (length--) {
        if (msg.author.id.indexOf(main.globalAdmin[length]) != -1) {
          isGlobalAdmin = true;
        }
      }

      if (isGlobalAdmin) {
        msg.reply("Setting game to: **" + args + "**...");
        bot.user.setGame(args, '')
          .then(msg.reply("Set game to: **" + args + "**!"));
      } else {
        msg.reply('You are not a Global Admin!');
      }
    });
}