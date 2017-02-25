exports.desc = "Change some of the options for the bot.";
exports.syntax = "settings"

var main = require("../bot.js");
var Discord = require("discord.js");

var cmds = new Array(
	"prefix",
	"join_leave",
	"join_leave_channel",
	"invites"
)

exports.run = function(msg) {
  var bot = main.bot;
  var args = msg.content.split(" ");
  var sql = main.sql;

  if (!msg.guild.member(msg.author).hasPermission("MANAGE_GUILD")) return msg.reply("You need the Manage Server permission to run this command!");
  if (args[1] == undefined || typeof args[1] == "undefined") return msg.reply("Command List:\n" + cmds.join(", "));
  if (cmds.indexOf(args[1].toLowerCase()) == -1) return msg.reply("Command List:\n" + cmds.join(", "));

  sql.get(`SELECT * FROM db WHERE guildID ='${msg.guild.id}'`).then(row => {
  	var prefi = row.prefix;
  	if (cmds.indexOf(args[1].toLowerCase()) != -1) {
  		var cmd = cmds[cmds.indexOf(args[1].toLowerCase())];

  		if (cmd == "prefix") {
  			for (i = 0; i < main.globalAdmin.length; i++) {
      			let user = bot.users.get(main.globalAdmin[i]);
            
      			if (user.id == msg.author.id) {
        			canChange = true;
      			}
    		}
        
    		if (msg.author.id == msg.guild.owner.id) {
     			canChange = true;
   			}

			if (!canChange) {
				msg.reply("Only the Server Owner can run this command!");
				return;
			} else {
				if (typeof args[2] == "undefined" || args[2] == undefined) {
					msg.reply("Please specify a prefix!");
					return;
				}

				if (args[2].length == 0 || args[2].length > 3){
					msg.reply("The prefix length must be between 1-3 characters long!");
					return;
				}

				var prefix = args[2].toLowerCase();

				if (prefix == undefined || typeof prefix == undefined) {
					msg.reply("Prefix is undefined. ???");
					return;
				}

				if (prefi == prefix) {
					msg.reply("That is already the current prefix!");
					return;
				}

				if (prefix.includes(",") || prefix.includes(" ")) {
					msg.reply("Prefixes can not contain commas or spaces, sorry!");
					return;
				}

				const embed = new Discord.RichEmbed()
  					.setTitle('-=-=-=-= Server Prefix Update -=-=-=-=')
  					.setAuthor( msg.author.username, msg.author.avatarURL )
  					.setColor([41, 255, 13])
  					.setDescription(`The Command prefix has been updated by **${msg.author.username}**`)
  					.setFooter('', '')
  					.setImage( "" )
  					.setThumbnail( "" )
  					.setTimestamp( '' )
  					.setURL('')
  					.addField(`-> Old Prefix`, `${prefi}`)
  					.addField(`-> New Prefix`, `${prefix}`);

  				sql.run(`UPDATE db SET prefix = '${prefix}' WHERE guildID = ${msg.guild.id}`);
  				msg.channel.sendEmbed(embed, '', { disableEveryone: true });
			}
  			return;
  		}

  		if (cmd == "join_leave") {
  			if (typeof args[2] == "undefined" || args[2] == undefined) {
				msg.reply("Please specify (on/off)");
				return;
			}

			var choice = args[2].toLowerCase();
			var configChoice = row.joinleave;

			if (choice == "on") {
				if (configChoice == "on") {
					msg.reply("Join/Leave messages are already enabled.");
					return;
				}

				sql.run(`UPDATE db SET joinleave = '${choice}' WHERE guildID = ${msg.guild.id}`);
  				msg.channel.sendMessage("Join/Leave Messages are now enabled. Use **settings join_leave_channel** to change the channel!");
  				return;
			}

			if (choice == "off") {
				if (configChoice == "off") {
					msg.reply("Join/Leave messages are already disabled.");
					return;
				}

				sql.run(`UPDATE db SET joinleave = '${choice}' WHERE guildID = ${msg.guild.id}`);
  				msg.channel.sendMessage("Join/Leave Messages are now disabled.");
  				return;
			}

			msg.reply("Please specify (on/off)");
			return;
  		}

  		if (cmd == "join_leave_channel") {
  			if (row.joinleave == "off") {
  				msg.reply('Join/Leave Messages are off!');
  				return;
  			}

  			if (typeof args[2] == "undefined" || args[2] == undefined) {
				sql.run(`UPDATE db SET joinleaveid = '${msg.channel.id}' WHERE guildID = ${msg.guild.id}`);
  				msg.channel.sendMessage("Join/Leave Messages are now going to appear in this channel.");
				return;
			}

			var choice = msg.mentions.channels.first();

			if (choice == undefined || choice == null) {
				msg.reply("Please mention a valid channel!");
				return;
			}

			sql.run(`UPDATE db SET joinleaveid = '${choice.id}' WHERE guildID = ${msg.guild.id}`)
			.then(() => {
				msg.channel.sendMessage("Join/Leave Messages are going to appear in #" + choice.name + " now!")
			});
  			msg.guild.channels.get(choice.id).sendMessage("Join/Leave Messages are now going to appear in this channel.");
  			return;
  		}

  		if (cmd == "invites") {
  			if (typeof args[2] == "undefined" || args[2] == undefined) {
				msg.reply("Please specify (on/off)");
				return;
			}

			var choice = args[2].toLowerCase();
			var configChoice = row.invites;

			if (choice == "on") {
				if (configChoice == "on") {
					msg.reply("Invite Filter is already enabled.");
					return;
				}

				sql.run(`UPDATE db SET invites = '${choice}' WHERE guildID = ${msg.guild.id}`)
				.then(() => {
					msg.channel.sendMessage("Invite Filter is now enabled.");
				});
  				return;
			}

		if (choice == "off") {
			var configChoice = row.invites;

			if (configChoice == "off") {
				msg.reply("Invite Filter is already disabled.");
				return;
			}

			sql.run(`UPDATE db SET invites = '${choice}' WHERE guildID = ${msg.guild.id}`)
			.then(() => {
				msg.channel.sendMessage("Invite Filter is now disabled.");
			});
  			return;
		}

		msg.reply("Please specify (on/off)");
		return;
  	}
  }
  });
}