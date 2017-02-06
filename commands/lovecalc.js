exports.desc = "Use the Love Calculator on 2 people (by their names)!";
exports.syntax = "lovecalc (person1) (person2)"

exports.run = function(msg) {
  console.log(`${msg.author.username} has used the Love Calculator command on ${msg.channel.guild.name}`);

  let main = require('C:/BOT/bot.js');
  var unirest = main.unirest;
  let config = main.config;
  var Discord = main.Discord;
  let cmd = config["prefix_" + msg.channel.guild.id];
  let args = msg.content.replace(cmd + "lovecalc ", "").split(" ");

  if (args.length < 2) {
    msg.reply("Please specify 2 people's names to use the **Love Calculator** on");
    return;
  }

  unirest.get("https://love-calculator.p.mashape.com/getPercentage?fname=" + args[0] + "&sname=" + args[1])
    .header("X-Mashape-Key", main.auth["mashape-key"])
    .header("Accept", "application/json")
    .end(function (result) {
        const embed = new Discord.RichEmbed()
          .setTitle('-=-=-=-= Love Calculator -=-=-=-=')
          .setAuthor( msg.author.username, msg.author.avatarURL )
          .setColor([121, 212, 242])
          .setDescription(`\n`)
          .setFooter('', '')
          .setImage( "" )
          .setThumbnail( "" )
          .setTimestamp( '' )
          .setURL('')
          .addField(`-> Person One:`, `**${result.body.fname}**`)
          .addField(`-> Person Two:`, `**${result.body.sname}**`)
          .addField(`-> Compatibility (%)`, `**${result.body.percentage}**`)
          .addField(`-> Compatibility`, `**${result.body.result}**`)

        msg.channel.sendEmbed(embed, '', { disableEveryone: true });
      });
}
