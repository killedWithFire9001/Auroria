exports.desc = "List all of the servers I am connected to.";
exports.syntax = "servers"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var config = main.config;
  var cmd = config["prefix_" + msg.guild.id];
  var musQueue = main.musQueue;
  
       var serversActual = Array.from(bot.guilds.values());

       const embed = new Discord.RichEmbed()
            .setTitle('-=-=-=-= Server List -=-=-=-=')
            .setAuthor( msg.author.username, msg.author.avatarURL )
            .setColor([255, 28, 28])
            .setDescription(`\nList of servers that I am connected to.`)
            .setFooter('', '')
            .setImage( "" )
            .setThumbnail( "" )
            .setTimestamp( '' )
            .setURL('')
            .addField(`\n-> Server Count`, `**${bot.guilds.size}** servers.`);

       msg.delete();
       msg.channel.sendEmbed(embed, '', { disableEveryone: true });

}