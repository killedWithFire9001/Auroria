exports.desc = "Ask the 8ball a question, it will give you an answer!";
exports.syntax = "8ball (question)"

exports.run = function(msg) {
	var main = require("../bot.js");
	var magicEightBall = main.magicEightBall;
  	var rollADice = main.rollADice;
  	var Discord = main.Discord;

       var magicEightBallResult = Math.floor(Math.random()*magicEightBall.length);
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
            .addField(`\n-=-=-=-= You shake the ball, it says: -=-=-=-=`, `${magicEightBall[magicEightBallResult]}`);

        msg.channel.sendEmbed(embed, '', { disableEveryone: true });
        return;

       msg.reply("```An error occured\nReason: Like an actual f-cking error, how did you get this to appear? Better report this.```");
}