exports.desc = "Reload a command file without restarting the whole bot.";
exports.syntax = "reload (command)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;
      let args = msg.content.replace(cmd + "reload ", "").split(" ");

      var isGlobalAdmin = false;

      length = main.globalAdmin.length;
      while (length--) {
        if (msg.author.id.indexOf(main.globalAdmin[length]) != -1) {
          isGlobalAdmin = true;
        }
      }

      if (isGlobalAdmin) {
        if (args == "" || args == " " || args == null || args == undefined || args.size < 1) {
          return msg.reply("I need to know what command to reload!");
        }

        if (main.commands.indexOf(args[0]) != -1) {
          delete require.cache[require.resolve(`./${args[0]}.js`)];
          console.log("Commands> " + args[0] + " reloaded by " + msg.author.username + "#" + msg.author.discriminator);

          const embed = new Discord.RichEmbed()
            .setTitle('-=-=-=-=-= Command Reload =-=-=-=-=-')
            .setAuthor(msg.author.username + "#" + msg.author.discriminator, msg.author.avatarURL)
            .setColor([121, 212, 242])
            .setDescription(``)
            .setFooter('', '')
            .setImage('')
            .setThumbnail("")
            .setTimestamp('')
            .setURL('')
            .addField("-> Reload", `**${args[0]}** was reloaded!`);

          msg.channel.sendEmbed(embed, '', { disableEveryone: true });
          return;
        } else {
          msg.channel.sendMessage("That command does not exist, please specify one to reload!");
          return;
        }

      } else {
        msg.channel.sendMessage("You are not a Global Admin!");
        return;
      }
    });
}