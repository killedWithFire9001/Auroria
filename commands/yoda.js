exports.desc = "Turn your sentences into Yoda Speak!";
exports.syntax = "yoda (sentence)"

exports.run = function(msg) {
  console.log(`${msg.author.username} has used the Yoda Speak command on ${msg.channel.guild.name}`);

  let main = require('C:/BOT/bot.js');
  var unirest = main.unirest;
  let config = main.config;
  var Discord = main.Discord;
  let cmd = config["prefix_" + msg.channel.guild.id];
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
          .setAuthor( msg.author.username, msg.author.avatarURL )
          .setColor([121, 212, 242])
          .setDescription(`\n`)
          .setFooter('', '')
          .setImage( "" )
          .setThumbnail( "" )
          .setTimestamp( '' )
          .setURL('')
          .addField(`-> Error:`, `**API must be down ;-;**`);

        return msg.channel.sendEmbed(embedErr, '', { disableEveryone: true });
      }

      const embed = new Discord.RichEmbed()
          .setTitle('-=-=-=-= Yoda Speak -=-=-=-=')
          .setAuthor( msg.author.username, msg.author.avatarURL )
          .setColor([121, 212, 242])
          .setDescription(`\n`)
          .setFooter('', '')
          .setImage( "" )
          .setThumbnail( "" )
          .setTimestamp( '' )
          .setURL('')
          .addField(`-> Original:`, `**${args}**`)
          .addField(`-> Yoda:`, `**${result.body}**`);

        msg.channel.sendEmbed(embed, '', { disableEveryone: true });
      });
}
