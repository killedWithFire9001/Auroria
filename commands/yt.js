exports.desc = "Search YouTube for a video!";
exports.syntax = "yt (query)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  var bot = main.bot;

  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;

      var searchYT = main.searchYT;

      if (msg.content.replace(cmd + "yt ", "").startsWith(cmd + "yt ") || msg.content.replace(cmd + "yt ", "").startsWith(cmd + "yt")) {
        msg.channel.sendMessage("<@" + msg.author.id + "> > Please provide something to search!");
        return;
      }

      var opts = {
        maxResults: 5,
        type: 'video',
        key: main.auth["yt-s_key"]
      };

      msg.channel.startTyping();

      searchYT(msg.content.replace(cmd + "yt ", ""), opts, function (err, results) {
        msg.channel.stopTyping();
        if (err) return msg.channel.sendMessage("Error whilst searching.\n\`\`\`" + err + "\`\`\`");

        const embed = new Discord.RichEmbed()
          .setTitle('-=-=-=-= Search Result -=-=-=-=')
          .setAuthor(bot.user.username, bot.user.avatarURL)
          .setColor(0x00AE86)
          .setDescription(`**Searched:** ${msg.content.replace(cmd + "yt ", "")}`)
          .setFooter('', '')
          .setImage("")
          .setThumbnail("")
          .setTimestamp('')
          .setURL('')
          .addField(`-> ${results[0].title}`, `${results[0].link}`)
          .addField(`-> ${results[1].title}`, `${results[1].link}`)
          .addField(`-> ${results[2].title}`, `${results[2].link}`)
          .addField(`-> ${results[3].title}`, `${results[3].link}`)
          .addField(`-> ${results[4].title}`, `${results[4].link}`);

        msg.author.sendEmbed(embed, '', { disableEveryone: true })
          .then(() => { msg.reply("Check your DMs for search results.") });
      });
    });
}