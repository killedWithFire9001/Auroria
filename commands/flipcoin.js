exports.desc = "Flip a coin.";
exports.syntax = "flipcoin"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var musQueue = main.musQueue;
  var flipACoin = main.flipACoin;
  
       var flipCoinResult = Math.floor(Math.random()*flipACoin.length);
       const embed = new Discord.RichEmbed()
            .setTitle('')
            .setAuthor( msg.author.username, msg.author.avatarURL )
            .setColor([121, 212, 242])
            .setDescription(`\n`)
            .setFooter('', '')
            .setImage( "" )
            .setThumbnail( "" )
            .setTimestamp( '' )
            .setURL('')
            .addField(`\n-=-=-=-= A coin is flipped, the result is -=-=-=-=`, `**${flipACoin[flipCoinResult]}**`);

        msg.channel.sendEmbed(embed, '', { disableEveryone: true });
        return;

       msg.reply("```An error occured\nReason: Like an actual f-cking error, how did you get this to appear? Better report this.```");
}