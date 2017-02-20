exports.desc = "Change some of the options for the bot.";
exports.syntax = "settings"

var main = require("../bot.js");
var Discord = require("discord.js");
var config = main.config;

var cmds = new Array(
	"prefix",
	"join_leave",
	"join_leave_channel"
)

exports.run = function(msg) {
  var bot = main.bot;
  var prefi = config["prefix_" + msg.guild.id];
  var args = msg.content.split(" ");
  const fs = main.fs;

  if (!msg.guild.member(msg.author).hasPermission("MANAGE_GUILD")) return msg.reply("You need the Manage Server permission to run this command!");
  if (args[1] == undefined || typeof args[1] == "undefined") return msg.reply("Command List:\n" + cmds.join(", "));
  if (cmds.indexOf(args[1].toLowerCase()) == -1) return msg.reply("Command List:\n" + cmds.join(", "));

  if (cmds.indexOf(args[1].toLowerCase()) != -1) {
  	var cmd = cmds[cmds.indexOf(args[1].toLowerCase())];

  	if (cmd == "prefix") {
  		for (i = 0; i < main.globalAdmin.length; i++) {
      		let user = bot.users.get(main.globalAdmin[i]);
            
      		if (user.id == msg.author.id) {
        		canChange = true;
      		}
    	}

    	if (msg.guild.member(msg.author))
        
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

			if (args.length > 3 || args.length == 0) {
				msg.reply("The prefix length must be between 1-3 characters long! (" + args.length + ")");
				return;
			}

			if (args.includes(" ") || args == "" || args == " " || args.indexOf(' ') !== -1) {
				msg.reply("The prefix can not contain spaces!");
				return;
			}

			var prefix = args[2].toLowerCase();

			if (prefi == prefix) {
				msg.reply("That is already the current prefix!");
				return;
			}

			if (prefix.includes(",") || prefix.includes(" ") || config["prefix_" + msg.guild.id].includes(",")) {
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

			main.config["prefix_" + msg.guild.id] = prefix;
			config = main.config;
  			fs.writeFile('./config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
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

		if (choice == "on") {
			var configChoice = main.config["joinleave_" + msg.guild.id];

			if (configChoice == "on") {
				msg.reply("Join/Leave messages are already enabled.");
				return;
			}

			main.config["joinleave_" + msg.guild.id] = "on";
			config = main.config;
  			fs.writeFile('./config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
  			msg.channel.sendMessage("Join/Leave Messages are now enabled. Use **settings join_leave_channel** to change the channel!");
  			return;
		}

		if (choice == "off") {
			var configChoice = main.config["joinleave_" + msg.guild.id];

			if (configChoice == "off") {
				msg.reply("Join/Leave messages are already disabled.");
				return;
			}

			main.config["joinleave_" + msg.guild.id] = "off";
			config = main.config;
  			fs.writeFile('./config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
  			msg.channel.sendMessage("Join/Leave Messages are now disabled.");
  			return;
		}

		msg.reply("Please specify (on/off)");
		return;
  	}

  	if (cmd == "join_leave_channel") {
  		if (main.config["joinleave_" + msg.guild.id] == "off") {
  			msg.reply('Join/Leave Messages are off!');
  			return;
  		}

  		if (typeof args[2] == "undefined" || args[2] == undefined) {
			main.config["joinleavechannel_" + msg.guild.id] = msg.channel.id;
			config = main.config;
  			fs.writeFile('./config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
  			msg.channel.sendMessage("Join/Leave Messages are now going to appear in this channel.");
			return;
		}

		var choice = msg.mentions.channels.first();

		if (choice == undefined || choice == null) {
			msg.reply("Please mention a valid channel!");
			return;
		}

		main.config["joinleavechannel_" + msg.guild.id] = choice.id;
		config = main.config;
  		fs.writeFile('./config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
  		msg.channel.sendMessage("Join/Leave Messages are going to appear in <@" + choice.id + "> now!");
  		msg.guild.channels.get(choice.id).sendMessage("Join/Leave Messages are now going to appear in this channel.");
  	}
  }
}