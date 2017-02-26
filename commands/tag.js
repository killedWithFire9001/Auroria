exports.desc = "Send a specific tag's content to the chat.";
exports.syntax = "tag (name)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
    var bot = main.bot;
    var sql = main.sql;

    sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
        .then(row => {
            if (!row) return msg.reply('Unexpected error. Try again. o-o');
            var cmd = row.prefix;
            var args = msg.content.replace(cmd + "tag ", "").split(" ");

            if (args.length < 1 || args.length > 1) {
                msg.reply('Invalid arguments size. Syntax: **' + this.syntax + "**.");
                return;
            }

            sql.get("SELECT * FROM tags WHERE guildID ='" + msg.guild.id + "'")
                .then(rowT => {
                    if (!rowT) return msg.reply('There are no tags on this server!');

                    var data = JSON.parse(rowT.data);

                    if (data == undefined) return msg.reply('Data is empty!');

                    var found = false;
                    var foundI;

                    for(i = 0; i < data.length; i++) {
                        if (data[i].name == args[0]) {
                            found = true;
                            foundI = i;
                        }
                    }

                    if (!found) return msg.reply("Oops! That tag does not exist.");

                    msg.channel.sendMessage(data[foundI].content);
                });
        });
}