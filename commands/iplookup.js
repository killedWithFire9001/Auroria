exports.desc = "Look up information about an IP address.";
exports.syntax = "iplookup (ip)"

exports.run = function (msg) {
  let main = require('../bot.js');

  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;

      var unirest = main.unirest;
      var Discord = main.Discord;
      let args = msg.content.replace(cmd + "iplookup", "");

      if (args == null || args == "" || args == " " || args == cmd + "iplookup") {
        msg.reply("Please enter an IP to lookup.");
        return;
      }

      unirest.post("https://community-neutrino-ip-info.p.mashape.com/ip-info")
        .header("X-Mashape-Key", main.auth["mashape-key"])
        .header("Content-Type", "application/x-www-form-urlencoded")
        .header("Accept", "application/json")
        .send("ip=" + args)
        .end(function (result) {
          if (!result.body.valid) {
            const embedErr = new Discord.RichEmbed()
              .setTitle('-=-=-=-= IP Lookup -=-=-=-=')
              .setAuthor(msg.author.username, msg.author.avatarURL)
              .setColor([121, 212, 242])
              .setDescription(`\n**IP Lookup on:** ${args}`)
              .setFooter('', '')
              .setImage("")
              .setThumbnail("")
              .setTimestamp('')
              .setURL('')
              .addField("-> Error", "IP is not valid.");

            msg.channel.sendEmbed(embedErr, '', { disableEveryone: true });
            return;
          }

          const embed = new Discord.RichEmbed()
            .setTitle('-=-=-=-= IP Lookup -=-=-=-=')
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setColor([121, 212, 242])
            .setDescription(`\n**IP Lookup on:** ${args}`)
            .setFooter('', '')
            .setImage("")
            .setThumbnail("")
            .setTimestamp('')
            .setURL('')
            .addField(`-> Region:`, `**${result.body.region}**`)
            .addField(`-> City:`, `**${result.body.city}**`)
            .addField(`-> Country:`, `**${result.body.country}**`);

          msg.channel.sendEmbed(embed, '', { disableEveryone: true });
        });
    });
}
