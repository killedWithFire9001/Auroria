exports.desc = "Kick someone from the server.";
exports.syntax = "kick (@person) (reason)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var config = main.config;
  var cmd = config["prefix_" + msg.guild.id];
  var fs = main.fs;

	let params = msg.content.replace(cmd + "kick ", "").split(" ");
    msg.delete();

        if (msg.guild.roles.find("name", "Staff") == null) {
              msg.reply('```An error has occured\nReason: Role: Staff does not exist. Contact the server owner and get him/her to create it.```')
              return;
        }

        if (!(msg.member.roles.has(msg.guild.roles.find("name", "Staff").id))) {
              msg.reply('```You can not run this command\nReason: You are not in the correct permission role [Staff]```');
              return;
        }
  
        let user = msg.mentions.users.first();

    if (user == null) {
          msg.reply("User does not exist. (Make sure you mention the user)");
          return;
    }

    let reason = msg.content.replace(params[0] + " ", "").replace(cmd + "kick ", "");
    if (reason == null || reason == "" || params[0] == null || params[1] == null) {
        msg.reply("Command syntax: ** " + cmd + "kick @User Reason**");
        return;
        }

    if (user.bot) {
        msg.reply("I can not kick **Bots.**");
        return;
        }

        if (!msg.channel.guild.member(user).bannable) {
          msg.reply("I can not kick them!");
          return;
        }

        let kicker = "";
        let kicked = "";

        if (msg.channel.guild.member(msg.author).nickname == null) {
          kicker = msg.author.username;
        } else {
          kicker = msg.channel.guild.member(msg.author).nickname;
        }

         if (msg.channel.guild.member(user).nickname == null) {
          kicked = user.username;
        } else {
          kicked = msg.channel.guild.member(user).nickname;
        }
            let num = 0;

            if (parseInt(config["last_case_" + msg.guild.id]) == undefined || parseInt(config["last_case_" + msg.guild.id]) == null || config["last_case_" + msg.guild.id] == null || config["last_case_" + msg.guild.id] == undefined) {
              config["last_case_" + msg.guild.id] = 0;
              fs.writeFile('./config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
              num = 0;
            } else {
              num = config["last_case_" + msg.guild.id];
            }

          const embed = new Discord.RichEmbed()
            .setTitle('')
            .setAuthor( kicker + "#" + msg.author.discriminator, msg.author.avatarURL )
            .setColor([255, 67, 10])
            .setDescription(`**Member:** ${kicked}#${user.discriminator}\n**Action:** Kick\n**Reason:** ${reason}`)
            .setFooter('Case #' + num, '')
            .setImage('')
          	.setThumbnail( "" )
            .setTimestamp()
            .setURL('')

          const embedErr = new Discord.RichEmbed()
            .setTitle('')
            .setAuthor( kicker + "#" + msg.author.discriminator, msg.author.avatarURL )
            .setColor([255, 144, 18])
            .setDescription(`An error has occured while executing the command. Can not Kick-\n(User might have had a higher role)`)
            .setFooter('', '')
            .setImage('')
          .setThumbnail( "" )
            .setTimestamp()
            .setURL('')

        var chan = msg.guild.channels.find("name", "mod-log");
        if (chan == null || chan == undefined) {
          msg.reply("Please get the server owner to create a channel by the name of 'mod-log' in order to properly log Mod actions (such as kicking, etc). If you do make a channel, please be sure to disable 'send messages' for everyone.");
        } else {
          chan.sendEmbed(embed, '', { disableEveryone: true });
        }

    config["last_case_" + msg.guild.id] = parseInt(config["last_case_" + msg.guild.id])+1;
      fs.writeFile('./config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});

        msg.channel.guild.member(user).kick()
        .catch(err => {
          msg.channel.sendEmbed(embedErr, '', { disableEveryone: true });
          return;
        });

        user.sendEmbed(embed, '', { disableEveryone: true });
}