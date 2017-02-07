exports.desc = "View the song queue";
exports.syntax = "queue"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var config = main.config;
  var cmd = config["prefix_" + msg.channel.guild.id];
  var musicBotGuilds = main.musicBotGuilds;
  var musQueue = main.musQueue;

  var canPlay = false;

  for (var i = 0; i < musicBotGuilds.length && !canPlay; i++) {
    if (musicBotGuilds[i] === msg.guild.id) {
    	canPlay = true;
    }
  }


  if (!canPlay) {
    msg.delete();
    msg.reply(":musical_note: :no_entry_sign: Error. This server has not been whitelisted to use the music part of this bot. (Apply for access here: ** " + musicApplyLink + "**) :musical_note:");
    return;
   }

   toSend = [];

   if (musQueue[msg.channel.guild.id] == undefined || musQueue[msg.channel.guild.id][1] == undefined) {
   	msg.channel.sendMessage("Queue is empty!");
   	return;
   }

   if (musQueue[msg.guild.id][2] == undefined) {
    msg.channel.sendMessage("Current song: **" + musQueue[msg.guild.id][1].title + "** requested by **" + musQueue[msg.guild.id][1].requester + "**.\n*(Queue is empty)*");
    return;
   }

   for (i = 0; i < musQueue[msg.guild.id].length; i++) {
   	if (i !== 0 && i !== 1) {
   		toSend.push(`#${i-1} | ${musQueue[msg.guild.id][i].title}. [Link](${musQueue[msg.guild.id][i].url}) | Requested by ${musQueue[msg.guild.id][i].requester}`);
   	}
   }

  const embed = new Discord.RichEmbed()
  					.setTitle('-=-=-=-=-= Queue for **' + msg.guild.name + '** =-=-=-=-=-')
  					.setAuthor( msg.author.username + "#" + msg.author.discriminator, msg.author.avatarURL )
  					.setColor([121, 212, 242])
  					.setDescription(``)
  					.setFooter("", "")
  					.setImage('')
 					  .setThumbnail( "" )
  					.setTimestamp( '' )
  					.setURL('')
  					.addField("-> Current", musQueue[msg.channel.guild.id].current)
  					.addField("-> Queue", toSend.join("\n"));

  	msg.channel.sendEmbed(embed, '', { disableEveryone:true });
}