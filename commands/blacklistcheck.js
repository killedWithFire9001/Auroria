exports.desc = "Check whether an ID is blacklisted or not.";
exports.syntax = "blacklistcheck (ID)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var args = msg.content.split(" ");
  var sql = main.sql;

  if (main.globalAdmin.indexOf(msg.author.id) != -1) {
  	if (args.length < 2) {
  		msg.reply("Syntax: " + this.syntax + ".");
  		return;
  	}

  	let guildID = args[1];
  	let sender = msg.author.username + "#" + msg.author.discriminator;

  	sql.get(`SELECT * FROM blacklist WHERE guildID ='${guildID}'`).then(row => {
		  if (row) {
			  msg.channel.sendMessage(`Blacklist >> Guild = **blacklisted**. Reason: **${row.reason}**. Blacklisted by: **${row.blacklister}**.\nUnblacklist command: \`blacklist ${guildID}\``);
  		  return;
		  } else {
			  msg.channel.sendMessage("Blacklist >> Guild **not blacklisted**. Blacklist command: `blacklist " + guildID + " Reason`");
		  }
	  });
  } else {
  	return msg.reply('You are not a Global Admin!');
  }
}