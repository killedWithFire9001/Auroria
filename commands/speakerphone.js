exports.desc = "Talk to people from other servers!";
exports.syntax = "speakerphone"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var config = main.config;
  var cmd = config["prefix_" + msg.guild.id];
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
  	console.log("Hung up");
  	return;
  } else {
  	msg.channel.sendMessage(":telephone_receiver: Ringing on the speakerphone...");
  	speakerPhoneSearching[msg.guild.id] = msg.channel.id;
  	console.log("Ringing");
  	return;
  }
}
