exports.desc = "Kick someone from the server.";
exports.syntax = "kick (@person) (reason)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {

  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;

      var fs = main.fs;

      let params = msg.content.replace(cmd + "kick ", "").split(" ");

      if (!msg.guild.member(msg.author).hasPermission("KICK_MEMBERS")) {
        msg.reply('```An error has occured\nReason: You do not have the BAN_MEMBERS permission```')
        return;
      }

      let user = msg.mentions.users.first();

      if (user == null) {
        msg.reply("User does not exist. (Make sure you mention the user)");
        return;
      }

      let reason = msg.content.replace(params[0] + " ", "").replace(cmd + "kick ", "");
      if (reason == null || reason == "" || params[0] == null || params[1] == null) {
        msg.reply("Command syntax: ** " + cmd + "kick @User Reason**");
        return;
      }

      if (!msg.channel.guild.member(user).bannable) {
        msg.reply("I can not kick them!");
        return;
      }

      user.sendMessage(msg.author.username + "#" + msg.author.discriminator + " has kicked you from " + msg.guild.name + "! Reason: **" + reason + "**.");

      setTimeout(function () {
        msg.channel.guild.member(user).kick()
          .then(() => {
            msg.channel.sendMessage(":ok_hand:");
          })
          .catch(err => {
            msg.reply(`\`${err}\``);
            return;
          });
      }, 1000);
    });
}