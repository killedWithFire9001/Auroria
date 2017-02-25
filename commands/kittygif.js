exports.desc = "Random Kitty Gif.";
exports.syntax = "kittygf"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var unirest = main.unirest;

  unirest.get("http://api.giphy.com/v1/gifs/random?api_key=" + main.auth["giphy-key"] + "&tag=cute+cat")
  .end(function(result) {
  	if (result.code != 200) {
  		const embedErr = new Discord.RichEmbed()
          .setTitle('-=-=-=-= Random Kitty -=-=-=-=')
          .setAuthor( msg.author.username, msg.author.avatarURL )
          .setColor([121, 212, 242])
          .setDescription(`\n`)
          .setFooter('', '')
          .setImage( "" )
          .setThumbnail( "" )
          .setTimestamp( '' )
          .setURL('')
          .addField(`-> Error:`, `**API must be down ;-;**`);

        return msg.channel.sendEmbed(embedErr, '', { disableEveryone: true });
  	}

  	const embed = new Discord.RichEmbed()
          .setTitle('-=-=-=-= Random Kitty -=-=-=-=')
          .setAuthor( msg.author.username, msg.author.avatarURL )
          .setColor([121, 212, 242])
          .setDescription(`\n`)
          .setFooter('', '')
          .setImage( `${result.body.data.image_original_url}` )
          .setThumbnail( "https://s30.postimg.org/8f8znlpsh/Poweredby_100px_Black_Vert_Logo.png" )
          .setTimestamp( '' )
          .setURL(`${result.body.data.url}`);

        msg.channel.sendEmbed(embed, '', { disableEveryone: true });
  });
 }