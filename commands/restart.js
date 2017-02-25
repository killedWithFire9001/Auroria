exports.desc = "Restart the bot.";
exports.syntax = "restart"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  const embed = new Discord.RichEmbed()
    .setTitle('Command Executed')
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .setColor(0x00AE86)
    .setDescription('\nRestarting Bot, please wait a few seconds.')
    .setFooter('', '')
    .setImage('')
    .setThumbnail("https://s30.postimg.org/e932dtw5d/c6b26ba81f44b0c43697852e1e1d1420.png")
    .setTimestamp()
    .setURL('');

  var isRestartSure = main.isRestartSure;
  var bot = main.bot;

  var isGlobalAdmin = false;

  length = main.globalAdmin.length;
  while (length--) {
    if (msg.author.id.indexOf(main.globalAdmin[length]) != -1) {
      isGlobalAdmin = true;
    }
  }

  if (isGlobalAdmin) {

    if (main.bot.voiceConnections.size > 0) {
      if (!isRestartSure) {
        msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setTitle('Warning')
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setColor(0x00AE86)
            .setDescription('\nI am still connected to some voice channels, probably playing music, are you sure you want to restart me?')
            .setFooter('', '')
            .setImage('')
            .setThumbnail("")
            .setTimestamp()
            .setURL('')
            .addField("-> Confirm", "If you are sure, type the restart command again within 10 seconds."),
          '',
          { disableEveryone: true }
        );

        main.isRestartSure = true;

        setTimeout(function () {
          if (isRestartSure || main.isRestartSure) {
            main.isRestartSure = false;
            msg.channel.sendMessage("You did not confirm in the 10 second window - I am not going to restart.");
          }
        }, 10000);
        return;
      } else {
        bot.guilds.map(g => {
          if (bot.voiceConnections.get(g.id) != undefined) {
            g.defaultChannel.sendMessage("The bot is about to restart, sorry! The music will stop and I will have to disconnect. I will be back up and ready to use again in a few seconds.");
            bot.voiceConnections.get(g.id).channel.leave();
          }
        });

        msg.channel.sendEmbed(embed, '', { disableEveryone: true });
        setTimeout(function () {
          console.error("RESTART AT REQUEST OF " + msg.author.username + "#" + msg.author.discriminator);
          process.exit(1);
        }, 1500);
        return;
      }
    }



    msg.channel.sendEmbed(
      embed,
      '',
      { disableEveryone: true }
    );

    setTimeout(function () {
      console.error("RESTART AT REQUEST OF " + msg.author.username + "#" + msg.author.discriminator);
      process.exit(1);
    }, 1000);
  } else {
    msg.reply("You are not a Global Admin.");
  }
  return;

  msg.reply("```An error occured\nReason: Like an actual f-cking error, how did you get this to appear? Better report this.```");
}