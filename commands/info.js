exports.desc = "Recieve information about this bot.";
exports.syntax = "info"

var main = require("C:/BOT/bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var config = main.config;
  var cmd = config["prefix_" + msg.guild.id];
  var musQueue = main.musQueue;

  msg.delete();
       console.log(`${msg.author.username} has used the Info command on ${msg.channel.guild.name}`);
       const infoEmbed = new Discord.RichEmbed()
            .setTitle('Auroria - Info')
            .setAuthor( "", "" )
            .setColor([121, 212, 242])
            .setDescription( '**Auroria is a multi-purpose bot that was created by Thomas.**' )
            .setFooter('', '')
            .setImage('')
            .setThumbnail( "https://s28.postimg.org/44gmrivxp/Converted_file_e4fe5707.png" )
            .setTimestamp('')
            .setURL('')
            .addField('\nInvite', "[Invitation Link](https://discordapp.com/oauth2/authorize?client_id=254518325474885632&scope=bot&permissions=8/)", true)
            .addField("\nGitHub", "[GitHub Link](https://github.com/ShaderWave/Auroria)", true);

       msg.channel.sendEmbed(infoEmbed, '', { disableEveryone: true });
}
