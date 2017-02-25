exports.desc = "Get the invite link to add this bot to your server.";
exports.syntax = "invite"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var musQueue = main.musQueue;

       msg.delete();
       const infoEmbed = new Discord.RichEmbed()
            .setTitle('Auroria - Invite')
            .setAuthor( "", "" )
            .setColor([121, 212, 242])
            .setDescription( 'Thanks to BulletMemes, there is an easy link to use- **xrubyy.xyz/bot**. But there is a button below if you are lazy.' )
            .setFooter('', '')
            .setImage('')
            .setThumbnail( "https://s28.postimg.org/44gmrivxp/Converted_file_e4fe5707.png" )
            .setTimestamp('')
            .setURL('')
            .addField('\nInvite', "[Invitation Link](https://discordapp.com/oauth2/authorize?client_id=254518325474885632&scope=bot&permissions=8/)", true)

       msg.channel.sendEmbed(infoEmbed, '', { disableEveryone: true });
}