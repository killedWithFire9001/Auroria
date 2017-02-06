exports.desc = "The bot will remind you after a certain amount of time.";
exports.syntax = "remindme (time) (message)"

var main = require("C:/BOT/bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  let config = main.config;
  var cmd = config["prefix_" + msg.guild.id];
  var args = msg.content.replace(cmd + "remindme ", "").split(" ");
  var activeReminders = main.activeReminders;

  if (args[0] == null || args[1] == null) {
  	msg.reply("Syntax: " + this.syntax);
  	return;
  }

  if (parseTime(args[0]) > 3600) {
  	msg.reply('Too long! Max is 1 hour');
  	return;
  }

  let message = msg.content.replace(cmd + "remindme ", "").replace(args[0] + " ", "");

  const embed = new Discord.RichEmbed()
          .setTitle('-=-=-=-= Remind Added -=-=-=-=')
          .setAuthor( msg.author.username, msg.author.avatarURL )
          .setColor([121, 212, 242])
          .setDescription(`\nReminder WILL occur on the condition that the bot doesn't restart. Be aware this can happen as it's indev.`)
          .setFooter('', '')
          .setImage( '' )
          .setThumbnail( "" )
          .setTimestamp( '' )
          .setURL( '' )
          .addField("-> Reminder", "I will remind you in **" + args[0] + "** with message: **" + message + "**.");

   msg.channel.sendEmbed(embed, '', { disableEveryone: true });

  setTimeout(function() {
  	msg.author.sendMessage("**You asked me to remind you:**\n" + message);
  }, parseTime(args[0]) * 1000);
}

function parseTime(strTime) {
	timeSec = parseInt(strTime);

	if (strTime.includes("h")) {
		timeSec = timeSec*3600;
	} else if (strTime.includes("m")) {
		timeSec = timeSec*60
	} else {
		timeSec = parseInt(strTime);
	}

	if (timeSec == null || timeSec == undefined) {
		timeSec = 0;
	}

	return timeSec;
}