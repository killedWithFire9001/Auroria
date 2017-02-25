exports.desc = "Kills the bot.";
exports.syntax = "die"

var main = require("../bot.js");
var Discord = require("discord.js");
const exec = require('child_process').exec;

exports.run = function(msg) {
       var isGlobalAdmin = false;

       length = main.globalAdmin.length;
       while(length--) {
         if (msg.author.id.indexOf(main.globalAdmin[length])!=-1) {
           isGlobalAdmin = true;
         }
       }

       if (isGlobalAdmin) {
        if (main.bot.voiceConnections.size > 0) {
          if (!isRestartSure) {
            msg.channel.sendEmbed(
              new Discord.RichEmbed()
            .setTitle('Warning')
            .setAuthor( msg.author.username, msg.author.avatarURL )
            .setColor(0x00AE86)
            .setDescription('\nI am still connected to some voice channels, probably playing music, are you sure you want to kill me?')
            .setFooter('', '')
            .setImage('')
            .setThumbnail( "" )
            .setTimestamp()
            .setURL('')
            .addField("-> Confirm", "If you are sure, type the die command again within 10 seconds."),
            '',
            { disableEveryone: true }
            );

            isRestartSure = true;

            setTimeout(function() {
              if (isRestartSure) {
                isRestartSure = false;
                msg.channel.sendMessage("You did not confirm in the 10 second window - I am not going to die.");
              }
            }, 10000);

            return;
          }
        }

        const embed = new Discord.RichEmbed()
        .setTitle('Command Executed')
        .setAuthor( msg.author.username, msg.author.avatarURL )
        .setColor(0x00AE86)
        .setDescription('\nKilling Bot, Bye bye!')
        .setFooter('', '')
        .setImage('')
        .setThumbnail( "https://s30.postimg.org/e932dtw5d/c6b26ba81f44b0c43697852e1e1d1420.png" )
        .setTimestamp()
        .setURL('');

        msg.channel.sendEmbed(
         embed,
           '',
           { disableEveryone: true }
        );

        setTimeout(function() {
          console.error("KILL AT REQUEST OF " + msg.author.username + "#" + msg.author.discriminator);
      exec('node forever stopall', (error, stdout, stderr) => {
      	if (error) {
            console.error(`exec error: ${error}`);
         	return;
         }
         console.log(`stdout: ${stdout}`);
         console.log(`stderr: ${stderr}`);
        	});
        }, 1000);
       } else {
        msg.reply("You are not a Global Admin.");
       }
       return;

       msg.reply("```An error occured\nReason: Like an actual f-cking error, how did you get this to appear? Better report this.```");
}