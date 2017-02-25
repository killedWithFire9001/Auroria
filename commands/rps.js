exports.desc = "Play 'Rock, Paper, Scissors' with the bot!";
exports.syntax = "rps (item)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  var bot = main.bot;

  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      var cmd = row.prefix;

      var musQueue = main.musQueue;

      var errorMessage = "";

      const errorEmbed = new Discord.RichEmbed()
        .setTitle('-=-=-=-= Error -=-=-=-=')
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setColor([255, 28, 28])
        .setDescription(`An error has occured while trying to run this command.`)
        .setFooter('', '')
        .setImage("")
        .setThumbnail("")
        .setTimestamp('')
        .setURL('')
        .addField(`-> Error`, `You need to specify an item! (rock, paper or scissors)`);

      var rpsAnswers = new Array("rock", "paper", "scissors");
      var args = msg.content.replace(cmd + 'rps ', '');

      if (args == "rock") {
        var rpsResult = rpsAnswers[Math.floor(Math.random() * rpsAnswers.length)];

        if (rpsResult == "rock") {
          msg.reply("Rock. Damn!");
          return;
        } else if (rpsResult == "paper") {
          msg.reply("Paper. Haha, gotcha!");
          return;
        } else if (rpsResult == "scissors") {
          msg.reply("Scissors. Aww!");
          return;
        }
      }

      if (args == "paper") {
        var rpsResult = rpsAnswers[Math.floor(Math.random() * rpsAnswers.length)];

        if (rpsResult == "rock") {
          msg.reply("Rock. Aww!");
          return;
        } else if (rpsResult == "paper") {
          msg.reply("Paper. Damn!");
          return;
        } else if (rpsResult == "scissors") {
          msg.reply("Scissors. Haha, gotcha!");
          return;
        }
      }

      if (args == "scissors") {
        var rpsResult = rpsAnswers[Math.floor(Math.random() * rpsAnswers.length)];

        if (rpsResult == "rock") {
          msg.reply("Rock. Haha, gotcha!");
          return;
        } else if (rpsResult == "paper") {
          msg.reply("Paper. Aww!");
          return;
        } else if (rpsResult == "scissors") {
          msg.reply("Scissors. Damn!");
          return;
        }
      }

      msg.channel.sendEmbed(errorEmbed, '', { disableEveryone: true });
    });
}