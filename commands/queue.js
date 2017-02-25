exports.desc = "View the song queue";
exports.syntax = "queue"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var musicBotGuilds = main.musicBotGuilds;
  var musQueue = main.musQueue;

   let toSend = [];

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