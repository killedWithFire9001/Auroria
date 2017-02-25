exports.desc = "List all of the servers I am connected to.";
exports.syntax = "servers"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  var bot = main.bot;

  var shardID;
  var shardMax;
  var globalServers;

  if (bot.shard == null) {
    shardID = "None";
    shardMax = "None";
    globalServers = bot.guilds.size;

    const embed = new Discord.RichEmbed()
      .setTitle('-=-=-=-= Server List -=-=-=-=')
      .setAuthor(msg.author.username, msg.author.avatarURL)
      .setColor([255, 28, 28])
      .setDescription(`\nList of servers that I am connected to.`)
      .setFooter('', '')
      .setImage("")
      .setThumbnail("")
      .setTimestamp('')
      .setURL('')
      .addField(`\n-> Shard`, `**${shardID}/${shardMax}**.`)
      .addField(`\n-> Server Count`, `**${bot.guilds.size}** servers on Shard **${shardID}**. On **${globalServers}** servers **Globally**`)

    msg.channel.sendEmbed(embed, '', { disableEveryone: true });
  } else {
    shardID = bot.shard.id + 1;
    shardMax = bot.shard.count;

    bot.shard.fetchClientValues('guilds.size').then(results => {
      globalServers = results.reduce((prev, val) => prev + val, 0);

      const embed = new Discord.RichEmbed()
        .setTitle('-=-=-=-= Server List -=-=-=-=')
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setColor([255, 28, 28])
        .setDescription(`\nList of servers that I am connected to.`)
        .setFooter('', '')
        .setImage("")
        .setThumbnail("")
        .setTimestamp('')
        .setURL('')
        .addField(`\n-> Shard`, `**${shardID}/${shardMax}**.`)
        .addField(`\n-> Server Count`, `**${bot.guilds.size}** servers on Shard **${shardID}**. On **${globalServers}** servers **Globally**`)

      msg.channel.sendEmbed(embed, '', { disableEveryone: true });
    }).catch(console.error);
  }
}