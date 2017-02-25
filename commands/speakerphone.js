exports.desc = "Talk to people from other servers!";
exports.syntax = "speakerphone"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  var bot = main.bot;

  if (bot.shard != null) {
    msg.reply('Uh-oh! Sharding is enabled on the bot and speakerphone doesn\'t work with it yet- Sorry!');
    return;
  }

  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;

      var speakerPhoneConnections = main.speakerPhoneConnections;
      var speakerPhoneSearching = main.speakerPhoneSearching;

      if (speakerPhoneConnections[msg.guild.id] != undefined) {
        msg.channel.sendMessage(":telephone_receiver: Hanging up...");

        bot.guilds.get(speakerPhoneConnections[msg.guild.id]).channels.get(speakerPhoneConnections[msg.guild.id + "-channel"]).sendMessage(":telephone_receiver: The other party hung up on you!");

        speakerPhoneConnections[speakerPhoneConnections[msg.guild.id]] = null;
        speakerPhoneConnections[speakerPhoneConnections[msg.guild.id + "-channel"]] = null;

        speakerPhoneConnections[msg.guild.id] = null;
        speakerPhoneConnections[msg.guild.id + "-channel"] = null;

        msg.channel.sendMessage(":telephone_receiver: Hung up!");
        return;
      }

      if (speakerPhoneSearching[msg.guild.id] != undefined) {
        msg.channel.sendMessage(":telephone_receiver: No one picked up! Hanging up the phone...");
        speakerPhoneSearching[msg.guild.id] = null;
        return;
      } else {
        msg.channel.sendMessage(":telephone_receiver: Ringing on the speakerphone...");
        speakerPhoneSearching[msg.guild.id] = msg.channel.id;
        return;
      }
    });
}
