exports.desc = "Search the Urban Dictionary.";
exports.syntax = "urban (word)"

exports.run = function(msg) {
  console.log(`${msg.author.username} has used the Urban command on ${msg.channel.guild.name}`);
  
  let main = require('C:/BOT/bot.js');
  var unirest = main.unirest;
  let config = main.config;
  var Discord = main.Discord;
  let cmd = config["prefix_" + msg.channel.guild.id];
  let args = msg.content.replace(cmd + "urban ", "");
  let resultWord = "";
  let resultDef = "";
  let resultEx = "";

  if (args == null || args == "" || args == " " || args == cmd + "urban") {
    msg.reply("Please specify something to search on the **Urban Dictionary**.");
    return;
  }

  unirest.get("https://mashape-community-urban-dictionary.p.mashape.com/define?term=" + args)
    .header("X-Mashape-Key", main.auth["mashape-key"])
    .header("Accept", "text/plain")
    .end(function (result) {
      if (result.body.result_type == "no_results") {
        msg.channel.stopTyping();

        const embedErr = new Discord.RichEmbed()
          .setTitle('-=-=-=-= Urban Dictionary -=-=-=-=')
          .setAuthor( msg.author.username, msg.author.avatarURL )
          .setColor([121, 212, 242])
          .setDescription(`\nSearched: ${args}`)
          .setFooter('', '')
          .setImage( "" )
          .setThumbnail( "" )
          .setTimestamp( '' )
          .setURL('')
          .addField(`-> Results:`, `**Word does not exist.**`);
          msg.channel.sendEmbed(embedErr, '', { disableEveryone: true });
          return;
      }

      resultWord = result.body.list[0].word;
      resultDef = result.body.list[0].definition;
      resultEx = result.body.list[0].example;

      const embed = new Discord.RichEmbed()
          .setTitle('-=-=-=-= Urban Dictionary -=-=-=-=')
          .setAuthor( msg.author.username, msg.author.avatarURL )
          .setColor([121, 212, 242])
          .setDescription(`\nSearched: ${args}`)
          .setFooter('', '')
          .setImage( "" )
          .setThumbnail( "" )
          .setTimestamp( '' )
          .setURL('')
          .addField(`-> Word:`, `**${resultWord}**`)
          .addField(`-> Definition:`, `**${resultDef}**`)
          .addField(`-> Example:`, `**${resultEx}**`);

        msg.channel.sendEmbed(embed, '', { disableEveryone: true });
  });
}
