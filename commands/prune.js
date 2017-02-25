exports.desc = "Prune (delete) a specific amount of messages in the current channel.";
exports.syntax = "prune (amount)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  var bot = main.bot;

  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;

      var musQueue = main.musQueue;
      var canPrune = main.canPrune;

      let sender = null;
      if (msg.channel.guild.member(msg.author).nickname == null) {
        sender = msg.author.username;
      } else {
        sender = msg.channel.guild.member(msg.author).nickname;
      }
      msg.delete();

      if (msg.member.hasPermission("MANAGE_MESSAGES")) {
        if (canPrune == false) {
          msg.reply("```An error has occured.\nReason: Too many prune requests being sent, please wait a few seconds before trying again.```");
          return;
        }

        var messagecount = parseInt(msg.content.replace(cmd + "prune ", ''));
        if (messagecount == 0 || msg.content.replace(cmd + "prune ", '') == null || msg.content.replace(cmd + "prune ", '') == " ") {
          msg.reply("```An error has occured:\nReason: You must insert a number more than 0!```");
          return;
        }

        if (messagecount > 100) {
          msg.reply("```An error has occured:\nReason: You can only prune 100 messages!```");
          return;
        }

        canPrune = false;

        setTimeout(function () {
          canPrune = true;
        }, 500);

        msg.channel.fetchMessages({ limit: messagecount })
          .then(messages => {
            const msg_array = messages.filter(m => m.deletable).array();

            if (msg_array.length < messagecount) {
              messagecount = msg_array.length;
            }

            if (msg_array.length == 0) {
              msg.reply("No deletable messages! (Must not be older than 2 weeks. Sorry, Discord being stupid)");
              return;
            }

            msg.channel.bulkDelete(msg_array)
              .catch(err => {
                msg.reply("\`Can not delete messages (No permissions OR messages are older than 2 weeks)\`");
                return;
              });

            msg.channel.sendMessage(":ok_hand:");

          }).catch(err => msg.reply('Error fetching messages!'));
        return;
      }

      msg.reply("```You cannot run this command!\nReason: You do not have the MANAGE_MESSAGES permission```");
    });
}