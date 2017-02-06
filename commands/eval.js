exports.desc = "Eval, what else to say?";
exports.syntax = "eval (args)";

exports.run = function(msg) {
  var main = require("C:/BOT/bot.js");
  var Discord = main.Discord;
  var bot = main.bot;
  let config = main.config;
  var cmd = config["prefix_" + msg.guild.id];

  var isGlobalAdmin = false;

   length = main.globalAdmin.length;
   while(length--) {
    if (msg.author.id.indexOf(main.globalAdmin[length])!=-1) {
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
      evalRes = evalRes.replace(main.bot.token, "--snipped token--");
    }

    const embed = new Discord.RichEmbed()
          .setTitle('-=-=-=-= Eval -=-=-=-=')
          .setAuthor( msg.author.username, msg.author.avatarURL )
          .setColor([255, 28, 28])
          .setDescription(`eval(${msg.content.replace(cmd + "eval ", "")})`)
          .setFooter('', '')
          .setImage( "" )
          .setThumbnail( "" )
          .setTimestamp( '' )
          .setURL('')
          .addField(`-> Result`, `${evalRes}`);
    msg.channel.sendEmbed(embed, '', { disableEveryone: true });
  } else {
    msg.reply("You are not Global Admin and can not use this command!");
  }
}
