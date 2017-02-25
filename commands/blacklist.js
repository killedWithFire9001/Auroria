exports.desc = "Blacklist/unblacklist a server from using the bot.";
exports.syntax = "blacklist (ID) [reason]"

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
			msg.channel.sendMessage("Blacklist >> Guild **blacklisted** - Attempting unblacklist.");

  			sql.run(`DELETE FROM blacklist WHERE guildID ='${guildID}'`).then(() => {
  				msg.channel.sendMessage("Blacklist >> Unblacklisted **" + guildID + "**!");
  			}).catch(err => msg.channel.sendMessage("Blacklist >> Error whilst unblacklisting: `" + err + "`"));
  			return;
		} else {
			msg.channel.sendMessage("Blacklist >> Guild **not blacklisted** - Attempting blacklist.");

  			let reason = msg.content.replace(args[0], "").replace(args[1] + " ", "");

  			if (typeof reason == "undefined" || reason == "" || reason == " ") {
  				return msg.channel.sendMessage("Blacklist >> Error whilst blacklisting: **Reason was not provided.**");
  			}

  			sql.run('INSERT INTO blacklist (guildID, reason, blacklister) VALUES (?, ?, ?)', [guildID, reason, sender])
  			.then(row => {
  				if (bot.guilds.get(guildID) != null) {
  					bot.guilds.get(guildID).leave()
  					.then(() => {
  						msg.channel.sendMessage("Blacklist >> Inserted **" + guildID + "** into black-list and left the guild silently.");
  						console.log("BLACKLIST >>> " + guildID + " was blacklisted by " + sender + "!");
  					});
  					return;
  				} else {
  					msg.channel.sendMessage("Blacklist >> Inserted **" + guildID + "** into black-list.");
  					console.log("BLACKLIST >>> " + guildID + " was blacklisted by " + sender + "!");
  					return;
  				}
  			});
		}
	});
  } else {
  	return msg.reply('You are not a Global Admin!');
  }
}