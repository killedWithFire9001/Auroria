var main = require("C:/BOT/bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var config = main.config;
  var cmd = config["prefix_" + msg.guild.id];

  length = main.globalAdmin.length;
  while(length--) {
    if (msg.author.id.indexOf(main.globalAdmin[length])!=-1) {
      let params = msg.content.replace(cmd + "sendmsg ", "").split(" ");
      let mesg = msg.content.replace(cmd + "sendmsg ", "").replace(params[0] + " ", "");
      let guild = bot.guilds.get(params[0]);
      let sender = "";

      if (msg.channel.guild.member(msg.author).nickname == null) {
        sender = msg.author.username;
      } else {
        sender = msg.channel.guild.member(msg.author).nickname;
      }

      if (guild == null) {
        return msg.reply(":no_entry_sign: I am not connected to that guild or it does not exist! (Make sure to use the Guild ID and not the name!)");
      } else {
        msg.reply("I sent this to **" + guild.name + "**.\n\`\`\`" + sender + ": " + mesg + "\`\`\`");  
        guild.defaultChannel.sendMessage("**" + sender + "**: " + mesg);
        return;
      }
    }
  }

  msg.reply('```You can not run this command\nReason: You are not in the correct permission group [Global Admin]```');
}