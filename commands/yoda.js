exports.desc = "Turn your sentences into Yoda Speak!";
exports.syntax = "yoda (sentence)"

exports.run = function (msg) {
  let main = require('C:/BOT/bot.js');

  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;

      var unirest = main.unirest;
      var Discord = main.Discord;
      let args = msg.content.replace(cmd + "yoda ", "");

      if (args == null || args == "" || args == " " || args == cmd + "yoda") {
        msg.reply("Please specify something to turn into **Yoda Speak**");
        return;
      }

      unirest.get("https://yoda.p.mashape.com/yoda?sentence=" + args.replace(" ", "+"))
        .header("X-Mashape-Key", main.auth["mashape-key"])
        .header("Accept", "text/plain")
        .end(function (result) {
          if (result.code != 200) {
            const embedErr = new Discord.RichEmbed()
              .setTitle('-=-=-=-= Yoda Speak -=-=-=-=')
              .setAuthor(msg.author.username, msg.author.avatarURL)
              .setColor([121, 212, 242])
              .setDescription(`\n`)
              .setFooter('', '')
              .setImage("")
              .setThumbnail("")
              .setTimestamp('')
              .setURL('')
              .addField(`-> Error:`, `**API must be down ;-;**`);

            return msg.channel.sendEmbed(embedErr, '', { disableEveryone: true });
          }

          const embed = new Discord.RichEmbed()
            .setTitle('-=-=-=-= Yoda Speak -=-=-=-=')
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setColor([121, 212, 242])
            .setDescription(`\n`)
            .setFooter('', '')
            .setImage("")
            .setThumbnail("")
            .setTimestamp('')
            .setURL('')
            .addField(`-> Original:`, `**${args}**`)
            .addField(`-> Yoda:`, `**${result.body}**`);

          msg.channel.sendEmbed(embed, '', { disableEveryone: true });
        });
    });
}
