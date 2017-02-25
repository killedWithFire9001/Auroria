exports.desc = "Eval, what else to say?";
exports.syntax = "eval (args)";

exports.run = function (msg) {
  var main = require("../bot.js");
  var Discord = main.Discord;
  var bot = main.bot;

  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;
      var isGlobalAdmin = false;

      length = main.globalAdmin.length;
      while (length--) {
        if (msg.author.id.indexOf(main.globalAdmin[length]) != -1) {
          isGlobalAdmin = true;
        }
      }

      if (isGlobalAdmin) {
        var evalRes = "";
        try {
          evalRes = eval(msg.content.replace(cmd + "eval ", ""));
        } catch (e) {
          if (e instanceof SyntaxError) {
            msg.reply("Error whilst eval: " + e);
          } else {
            msg.reply("Error whilst eval: " + e);
          }
        }

        if (typeof evalRes !== 'string') evalRes = require('util').inspect(evalRes, {
          depth: 0
        });

        if (evalRes.includes(main.bot.token)) {
          evalRes = evalRes.replace(main.bot.token, "--snipped token--");           // Same thing
        }                                                                           // <-- Whatever - more security? :p.

        if (evalRes.includes(main.auth["bot-token"])) {
          evalRes = evalRes.replace(main.auth["bot-token"], "--snipped token--");
        }

        if (evalRes.includes(main.auth["mashape-key"])) {
          evalRes = evalRes.replace(main.auth["mashape-key"], "--snipped token--");
        }

        if (evalRes.includes(main.auth["cleverbot-token"])) {
          evalRes = evalRes.replace(main.auth["cleverbot-token"], "--snipped token--");
        }

        if (evalRes.includes(main.auth["cleverbot-password"])) {
          evalRes = evalRes.replace(main.auth["cleverbot-password"], "--snipped token--");
        }

        if (evalRes.includes(main.auth["giphy-key"])) {
          evalRes = evalRes.replace(main.auth["giphy-key"], "--snipped token--");
        }

        const embed = new Discord.RichEmbed()
          .setTitle('-=-=-=-= Eval -=-=-=-=')
          .setAuthor(msg.author.username, msg.author.avatarURL)
          .setColor([255, 28, 28])
          .setDescription(`eval(${msg.content.replace(cmd + "eval ", "")})`)
          .setFooter('', '')
          .setImage("")
          .setThumbnail("")
          .setTimestamp('')
          .setURL('')
          .addField(`-> Result`, `${evalRes}`);
        msg.channel.sendEmbed(embed, '', { disableEveryone: true });
      } else {
        msg.reply("You are not Global Admin and can not use this command!");
      }
    });
}
