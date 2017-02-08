exports.desc = "Take a look at all the commands or recieve help for a specific command.";
exports.syntax = "help [command]"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  let config = main.config;
  var cmd = config["prefix_" + msg.guild.id];
  let args = msg.content.split(" ");

  if (main.commands.indexOf(args[1]) != -1) {
      var file = require("./" + args[1] + ".js");

      const embedHelp = new Discord.RichEmbed()
            .setTitle('-=-=-=-=-= Help =-=-=-=-=-')
            .setAuthor( "", "" )
            .setColor([121, 212, 242])
            .setDescription(`Help for: **${args[1]}**`)
            .setFooter('', '')
            .setImage('')
            .setThumbnail( "" )
            .setTimestamp( '' )
            .setURL('')
            .addField("-> Syntax", cmd + "**" + file.syntax + "**")
            .addField("-> Description", file.desc);

      msg.channel.sendEmbed(embedHelp, '', { disableEveryone: true });
      return;
  } else {
	const embed = new Discord.RichEmbed()
  					.setTitle('-=-=-=-=-= Help =-=-=-=-=-')
  					.setAuthor( "", "" )
  					.setColor([121, 212, 242])
  					.setDescription(``)
  					.setFooter(msg.author.username + "#" + msg.author.discriminator, msg.author.avatarURL)
  					.setImage('')
 					  .setThumbnail( "" )
  					.setTimestamp( '' )
  					.setURL('')
  					.addField("-> General", 'help, info, invite, credits, serverinfo, servers, ping, uptime, avatar, remindme')
  					.addField("-> Fun", 'rps, rolldice, flipcoin, cleverbot, 8ball, urban, yoda, lovecalc, iplookup, kittygif, speakerphone')
  					.addField("-> Music", "connect, disconnect, queue, remqueue, play, pause, resume, skip, volume")
  					.addField("-> Moderation", "prune, kick, ban, clean")
  					.addField("-> Bot Settings", "setprefix")
  					.addField("-> Bot Owner", "restart, reload, die, eval");

  		msg.channel.sendEmbed(embed, '', { disableEveryone: true });
  }
}