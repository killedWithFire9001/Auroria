exports.desc = "Ban someone from the server.";
exports.syntax = "ban (@person) (reason)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var fs = main.fs;
      var cmd = row.prefix;

      let params = msg.content.replace(cmd + "ban ", "").split(" ");

      if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
        msg.reply('```An error has occured\nReason: You do not have the BAN_MEMBERS permission```')
        return;
      }

      let user = msg.mentions.users.first();

      if (user == null) {
        msg.reply("User does not exist. (Make sure you mention the user)");
        return;
      }

      let reason = msg.content.replace(params[0] + " ", "").replace(cmd + "ban ", "");
      if (reason == null || reason == "" || params[0] == null || params[1] == null) {
        msg.reply("Command syntax: ** " + cmd + "ban @User Reason**");
        return;
      }

      if (!msg.channel.guild.member(user).bannable) {
        msg.reply("I can not ban them!");
        return;
      }

      let banner = "";
      let banned = "";

      if (msg.channel.guild.member(msg.author).nickname == null) {
        banner = msg.author.username;
      } else {
        banner = msg.channel.guild.member(msg.author).nickname;
      }

      if (msg.channel.guild.member(user).nickname == null) {
        banned = user.username;
      } else {
        banned = msg.channel.guild.member(user).nickname;
      }

      user.sendMessage(msg.author.username + "#" + msg.author.discriminator + " has banned you from " + msg.guild.name + "! Reason: **" + reason + "**.");

      setTimeout(function () {
        msg.channel.guild.member(user).ban()
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