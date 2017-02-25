exports.desc = "Take a look at all the commands or recieve help for a specific command.";
exports.syntax = "help [command]"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;

      let args = msg.content.split(" ");
      var unirest = main.unirest;

      if (main.commands.indexOf(args[1]) != -1) {
        var file = require("./" + args[1] + ".js");

        const embedHelp = new Discord.RichEmbed()
          .setTitle(args[1])
          .setAuthor("", "")
          .setColor([121, 212, 242])
          .setDescription(`**Description:** ${file.desc}\nSyntax: ${cmd}${file.syntax} `)
          .setFooter('', '')
          .setImage('')
          .setThumbnail("")
          .setTimestamp('')
          .setURL('');

        msg.channel.sendEmbed(embedHelp, '', { disableEveryone: true });
        return;
      } else {
        const embed = new Discord.RichEmbed()
          .setTitle('-=-=-=-=-= Help =-=-=-=-=-')
          .setAuthor("", "")
          .setColor([121, 212, 242])
          .setDescription(``)
          .setFooter(msg.author.username + "#" + msg.author.discriminator, msg.author.avatarURL)
          .setImage('')
          .setThumbnail("")
          .setTimestamp('')
          .setURL('')
          .addField("-> General", 'help, info, invite, credits, serverinfo, servers, ping, uptime, avatar, remindme')
          .addField("-> Fun", 'rps, rolldice, flipcoin, cleverbot, 8ball, urban, yoda, lovecalc, iplookup, kittygif, puppygif, speakerphone, zone')
          .addField("-> News", "buzzfeed, cnn, dailymail")
          .addField("-> Music", "yt, connect, disconnect, queue, remqueue, play, pause, resume, skip, volume")
          .addField("-> Moderation", "prune, kick, ban, clean")
          .addField("-> Bot Settings", "settings")
          .addField("-> Bot Owner", "restart, reload, die, eval");

        msg.author.sendEmbed(embed, '', { disableEveryone: true })
          .then(() => { msg.channel.sendMessage("<@" + msg.author.id + "> > Check your DMs!") })
      }
    });
}