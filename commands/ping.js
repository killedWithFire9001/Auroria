exports.desc = "Get the time it takes for the bot to respond after you send a command!";
exports.syntax = "ping"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;

  var sender = "";
       if (msg.channel.guild.member(msg.author).nickname == null) {
          sender = msg.author.username;
       } else {
          sender = msg.channel.guild.member(msg.author).nickname;
       }
       msg.delete();
       let ping = Date.now()-msg.createdTimestamp;
       let time = ping/1000;
         // SEXC EMBEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
          const embed = new Discord.RichEmbed()
          .setTitle('')
          .setAuthor( sender, msg.author.avatarURL )
          .setColor(0x00AE86)
          .setDescription('')
          .setFooter('', '')
          .setImage('')
          .setThumbnail( "https://discordapp.com/assets/371886a66446c46e66e9435158468720.svg" )
          .setTimestamp()
          .setURL('')
          .addField('\nPong! Time Taken:', ping + " ms.")

      msg.channel.sendEmbed(
       embed,
         '',
         { disableEveryone: true }
      );
}