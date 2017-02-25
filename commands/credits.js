exports.desc = "Take a look at the people who made this bot possible!";
exports.syntax = "credits"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var info = main.info;
  
       msg.reply('```Check your DMs for the credits list```');
       const creditsEmbed = new Discord.RichEmbed()
            .setTitle('Credits List')
            .setAuthor( bot.user.username, bot.user.avatarURL )
            .setColor(0x00AE86)
            .setDescription('This is a list of the people that have made/help made the bot + shape it to what it is today! These people are amazing. <3')
            .setFooter(`Bot Version: ${info["bot-version"]}`, '')
            .setImage('https://s-media-cache-ak0.pinimg.com/originals/4f/b0/43/4fb043c5eb0f173f7da4f4ed75c1e2f9.png')
            .setThumbnail( "https://images-ext-2.discordapp.net/.eJwFwW0OwiAMANC7cABoy5csMZ6lKVVn1BFAf2h29733N5_-NIu5z9nG4pzUt63rkK1Xbs3K9nL85cl9OCRKPuEpFkACH2JykVgxl6sknzOAUkIIhYU9KmpB-2i3y1h_ekagYPYDdTAgtQ.xm6BqHMx7Aeuz7p5Ddou09wzUhk" )
            .setTimestamp()
            .setURL('')
            .addField('\nThomas (Me, writing this):', "The main creator/programmer for the Bot. Did all the coding and had the original idea for the Bot.")
            .addField('\nBulletMemes:', "Tester & Support Staff. Helped come up with ideas for the bot and helped me fix HEAPS of bugs whilst making it.")
            .addField('\nMythical:', "Tester. Helped come up with ideas for the bot and helped test ALL features.")
            .addField('\nStackoverflow & Reddit:', "Programming Support. I'm new to JavaScript and these communities supported me the whole way.");

       msg.author.sendEmbed(creditsEmbed, '', { disableEveryone: true });
}