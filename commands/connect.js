exports.desc = "Get the bot to connect to your voice channel.";
exports.syntax = "connect"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var config = main.config;
  var cmd = config["prefix_" + msg.guild.id];
  var musicBotGuilds = main.musicBotGuilds;
  var musQueue = main.musQueue;

  console.log(`${msg.author.username} has used the Connect command on ${msg.channel.guild.name}`);
      var canPlay = false;
      var sender = "";
       if (msg.channel.guild.member(msg.author).nickname == null) {
          sender = msg.author.username;
       } else {
          sender = msg.channel.guild.member(msg.author).nickname;
       }

      for (var i = 0; i < musicBotGuilds.length && !canPlay; i++) {
        if (musicBotGuilds[i] === msg.guild.id) {
          canPlay = true;
        }
      }

      if (!canPlay) {
        msg.delete();
        msg.reply(":musical_note: :no_entry_sign: Error. This server has not been whitelisted to use the music part of this bot. (Apply for access here: ** " + musicApplyLink + "**) :musical_note:");
        return;
      }
      
      if (bot.voiceConnections.size >= 5) {


    msg.delete();
    msg.reply(":musical_note: :no_entry_sign: Error. The bot has reached the maximum amount of Voice Connections (across all connected guilds). Please try again later when a slot might be available!");
    return;
      }

      msg.delete();

      const voiceChannel = msg.member.voiceChannel;
      if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply(':musical_note: I couldn\'t connect to your voice channel...');

          const connectingEmbed = new Discord.RichEmbed()
            .setTitle('')
            .setAuthor( sender, msg.author.avatarURL )
            .setColor(0x00AE86)
            .setDescription('')
            .setFooter('', '')
            .setImage('')
            .setThumbnail( "" )
            .setTimestamp()
            .setURL('')
            .addField('\nStatus:', "Connecting to your voice channel... 🕘");

          const connectedEmbed = new Discord.RichEmbed()
            .setTitle('')
            .setAuthor( sender, msg.author.avatarURL )
            .setColor(0x00AE86)
            .setDescription('')
            .setFooter('', '')
            .setImage('')
            .setThumbnail( "" )
            .setTimestamp()
            .setURL('')
            .addField('\nStatus:', "Connected to your voice channel! ✅");

          const connectedEmptyEmbed = new Discord.RichEmbed()
            .setTitle('')
            .setAuthor( sender, msg.author.avatarURL )
            .setColor(0x00AE86)
            .setDescription('')
            .setFooter('', '')
            .setImage('')
            .setThumbnail( "" )
            .setTimestamp()
            .setURL('')
            .addField('\nStatus:', "Connected to your voice channel! ✅")
            .addField('\nNotification:', "The queue is empty! Add something to the queue with " + cmd + "playsong");



      msg.channel.sendEmbed(
    connectingEmbed,
      '',
      { disableEveryone: true }
    ).then(mesg => {
        setTimeout(function() {
          mesg.delete();
        }, 5000);
      });

    var empty = false;

    if (musQueue[msg.guild.id] === undefined) {
        empty = true;
      } else if (musQueue[msg.guild.id][1] == undefined) {
        empty = true;
      } else {
        empty = false;
      }

      if (empty) {
        voiceChannel.join()
        .then( 
          msg.channel.sendEmbed(
        connectedEmptyEmbed,
          '',
          { disableEveryone: true }
        ));
      } else {
        voiceChannel.join()
        .then(
          msg.channel.sendEmbed(
        connectedEmbed,
          '',
          { disableEveryone: true }
        ));
      }

      console.log("Music> Connected to: " + voiceChannel.name + " on " + msg.channel.guild.name + ".");

}