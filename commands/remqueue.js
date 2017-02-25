exports.desc = "Remove a specific song from the queue.";
exports.syntax = "remqueue (song_num)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  var bot = main.bot;

  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;
      var musQueue = main.musQueue;

      if (msg.guild.roles.find("name", "Staff") == null) {
        msg.reply('```An error has occured\nReason: Role: Staff does not exist. Contact the server owner and get him/her to create it.```')
        return;
      }

      if (!(msg.member.roles.has(msg.guild.roles.find("name", "Staff").id))) {
        m.reply('```You can not run this command\nReason: You are not in the correct permission role [Staff]```');
        return;
      }

      let params = msg.content.replace(cmd + "remqueue ", "").split(" ");
      let index = parseInt(params[0]) + 1;

      if (params.length < 1 || params.length > 1) {
        msg.reply(cmd + "remqueue [Music-Queue-#]");
        return;
      }

      if (params[0] == 0) {
        msg.reply("Use **" + cmd + "skip** instead!");
        return;
      }

      /*
      if (musQueue[msg.guild.id][params[0]+1] == undefined) {
        msg.reply("Cannot delete:\n\`\`\`musQueue + params returned null\`\`\`");
        return;
      }
      */

      if (msg.channel.guild.member(msg.author).nickname == null) {
        sender = msg.author.username;
      } else {
        sender = msg.channel.guild.member(msg.author).nickname;
      }

      msg.delete();
      msg.reply("**" + sender + "** removed **" + musQueue[msg.guild.id][index].title + "** from the Music Queue. Orginially requested by **" + musQueue[msg.guild.id][index].requester + "**.");
      musQueue[msg.guild.id].splice(index, 1);
    })
}