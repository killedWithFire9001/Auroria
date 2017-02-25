exports.desc = "See how long the bot has been up for.";
exports.syntax = "uptime"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var musQueue = main.musQueue;

       const embed = new Discord.RichEmbed()
            .setTitle('-=-=-=-= Bot Uptime -=-=-=-=')
            .setAuthor( msg.author.username, msg.author.avatarURL )
            .setColor([255, 28, 28])
            .setDescription(`\n`)
            .setFooter('', '')
            .setImage( "" )
            .setThumbnail( "" )
            .setTimestamp( '' )
            .setURL('')
            .addField(`\n-> Uptime (ms)`, `**${bot.uptime}** ms`)
            .addField(`\n-> Uptime (s)`, `**${bot.uptime/1000}** seconds`);

       msg.channel.sendEmbed(embed, '', { disableEveryone: true });
}