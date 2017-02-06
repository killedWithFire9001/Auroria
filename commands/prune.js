exports.desc = "Prune (delete) a specific amount of messages in the current channel.";
exports.syntax = "prune (amount)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var config = main.config;
  var cmd = config["prefix_" + msg.guild.id];
  var musQueue = main.musQueue;
  var canPrune = main.canPrune;

  console.log(`${msg.author.username} has attempted to use the Prune command on ${msg.channel.guild.name}`);
      let sender = null;
      if (msg.channel.guild.member(msg.author).nickname == null) {
          sender = msg.author.username;
      } else {
          sender = msg.channel.guild.member(msg.author).nickname;
      }
      msg.delete();

      if (msg.member.hasPermission("MANAGE_MESSAGES")) {
        if (canPrune == false) {
          msg.reply("```An error has occured.\nReason: Too many prune requests being sent, please wait a few seconds before trying again.```");
          return;
        }

        var messagecount = parseInt(msg.content.replace(cmd + "prune ", ''));
        if (messagecount == 0 || msg.content.replace(cmd + "prune ", '') == null || msg.content.replace(cmd + "prune ", '') == " ") {
          msg.reply("```An error has occured:\nReason: You must insert a number more than 0!```");
          return;
        }

        if (messagecount > 100) {
          msg.reply("```An error has occured:\nReason: You can only prune 100 messages!```");
          return;
        }

        canPrune = false;

        setTimeout(function() {
          canPrune = true;
        }, 2000);

        msg.channel.fetchMessages({limit: messagecount})
        .then(messages => {
          const msg_array = messages.array();

          if (msg_array.length < messagecount) {
            messagecount = msg_array.length;
          }

          msg.channel.bulkDelete(msg_array)
          .catch(err => { 
            msg.reply("\`" + console.error + "\`");
            return;
          });
          const embed = new Discord.RichEmbed()
            .setTitle('')
            .setAuthor( sender + "#" + msg.author.discriminator, msg.author.avatarURL )
            .setColor([31, 255, 34])
            .setDescription(`**Channel:** #${msg.channel.name}\n**Action:** Prune\n**Amount:** ${messagecount}`)
            .setFooter('', '')
            .setImage('')
          .setThumbnail( "" )
            .setTimestamp()
            .setURL('')

          var chan = msg.guild.channels.find("name", "mod-log");
      if (chan == null || chan == undefined) {
        msg.reply("Please get the server owner to create a channel by the name of 'mod-log' in order to properly log Mod actions (such as kicking, etc). If you do make a channel, please be sure to disable 'send messages' for everyone.");
        msg.channel.sendMessage(embed, '', { disableEveryone: true });
      } else {
      chan.sendEmbed(embed, '', { disableEveryone: true });
      }
        });
        return;
      }

      msg.reply("```You cannot run this command!\nReason: You do not have the MANAGE_MESSAGES permission```");

}