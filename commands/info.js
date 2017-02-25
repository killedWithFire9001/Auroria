exports.desc = "Recieve information about this bot.";
exports.syntax = "info"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var musQueue = main.musQueue;
  var info = main.info;

  msg.delete();
       const infoEmbed = new Discord.RichEmbed()
            .setTitle('Auroria - Info')
            .setAuthor( "", "" )
            .setColor([121, 212, 242])
            .setDescription( '**Auroria is a multi-purpose bot that was created by Thomas.**' )
            .setFooter(`Version ${info["bot-version"]}`, '')
            .setImage('')
            .setThumbnail( bot.user.avatarURL )
            .setTimestamp('')
            .setURL('')
            .addField('\nInvite', "[Invitation Link](https://discordapp.com/oauth2/authorize?client_id=254518325474885632&scope=bot&permissions=8/)", true)
            .addField("\nGitHub", "[GitHub Link](https://github.com/ShaderWave/Auroria)", true)
            .addField('\nSupport Server', "[Join](https://discord.gg/mcVYrPz)", true)

       msg.channel.sendEmbed(infoEmbed, '', { disableEveryone: true });
}
