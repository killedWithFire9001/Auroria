exports.desc = "Get your or another person's avatar url.";
exports.syntax = "avatar [@person]"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  var bot = main.bot;
  var musQueue = main.musQueue;

  let mention = msg.mentions.users.first();
  let sender = "";

  if (msg.channel.guild.member(msg.author).nickname == null) {
    sender = msg.author.username;
  } else {
    sender = msg.channel.guild.member(msg.author).nickname;
  }

  if (mention != null || mention != undefined) {
    var name = mention.username + "'s ";

    if (mention.username.endsWith("s")) {
      name = mention.username + "' ";
    }

    const avatarEmbedOther = new Discord.RichEmbed()
      .setTitle('-=-=-=-= Avatar -=-=-=-=')
      .setAuthor(mention.username, mention.avatarURL)
      .setColor([121, 212, 242])
      .setDescription(name + "Avatar + URL")
      .setFooter('', '')
      .setImage('')
      .setThumbnail(mention.avatarURL)
      .setTimestamp('')
      .setURL('')
      .addField('\nURL ->', `[URL](${mention.avatarURL})`, false);
    msg.channel.sendEmbed(avatarEmbedOther, '', { disableEveryone: true });
    return;
  } else {
    const avatarEmbed = new Discord.RichEmbed()
      .setTitle('-=-=-=-= Your Avatar -=-=-=-=')
      .setAuthor(sender, msg.author.avatarURL)
      .setColor([121, 212, 242])
      .setDescription('Your Avatar + URL')
      .setFooter('', '')
      .setImage('')
      .setThumbnail(msg.author.avatarURL)
      .setTimestamp('')
      .setURL('')
      .addField('\nURL ->', `[URL](${msg.author.avatarURL})`, false);


    msg.channel.sendEmbed(avatarEmbed, '', { disableEveryone: true });
    return;
  }
  msg.reply("```An error occured\nReason: Like an actual f-cking error, how did you get this to appear? Better report this.```");
}