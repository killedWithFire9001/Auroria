exports.desc = "Roll a dice!";
exports.syntax = "rolldice"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var musQueue = main.musQueue;
  var rollADice = main.rollADice;

       var rollDiceResult = Math.floor(Math.random()*rollADice.length);
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
            .addField(`\n-=-=-=-= A dice is rolled, the result is -=-=-=-=`, `#${rollADice[rollDiceResult]}`);

        msg.channel.sendEmbed(embed, '', { disableEveryone: true });
        return;

       msg.reply("```An error occured\nReason: Like an actual f-cking error, how did you get this to appear? Better report this.```");
}