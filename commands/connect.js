exports.desc = "Get the bot to connect to your voice channel.";
exports.syntax = "connect"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  var bot = main.bot;
  var musQueue = main.musQueue;

  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;
      var sender = "";

      if (msg.channel.guild.member(msg.author).nickname == null) {
        sender = msg.author.username;
      } else {
        sender = msg.channel.guild.member(msg.author).nickname;
      }

      if (bot.voiceConnections.size >= 5) {
        msg.delete();
        msg.reply(":musical_note: :no_entry_sign: Error. The bot has reached the maximum amount of Voice Connections (across all connected guilds). Please try again later when a slot might be available!");
        return;
      }

      msg.delete();

      const voiceChannel = msg.member.voiceChannel;
      if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply(':musical_note: I couldn\'t connect to your voice channel...');

      const connectedEmbed = new Discord.RichEmbed()
        .setTitle('')
        .setAuthor(sender, msg.author.avatarURL)
        .setColor(0x00AE86)
        .setDescription('')
        .setFooter('', '')
        .setImage('')
        .setThumbnail("")
        .setTimestamp("")
        .setURL('')
        .addField('\nStatus:', "Connected to your voice channel!");

      voiceChannel.join()
        .then(
        msg.channel.sendEmbed(
          connectedEmbed,
          '',
          { disableEveryone: true }
        ));

      console.log("Music> Connected to: " + voiceChannel.name + " on " + msg.channel.guild.name + ".");
    });
}