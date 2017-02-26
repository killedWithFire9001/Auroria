exports.desc = "Remove a tag.";
exports.syntax = "removetag (name)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
    var bot = main.bot;
    var sql = main.sql;

    if (!msg.guild.member(msg.author).hasPermission("MANAGE_MESSAGES")) return msg.reply('You need the MANAGE MESSAGES permission to run this command!');

    sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
        .then(row => {
            var cmd = row.prefix;
            var args = msg.content.replace(cmd + "removetag ", "").split(" ");

            if (args.length < 1 || args.length > 1) {
                msg.reply("Invalid argument size! Syntax: **" + this.syntax + "**.");
                return;
            }

            sql.get("SELECT * FROM tags WHERE guildID ='" + msg.guild.id + "'")
                .then(rowT => {
                    var data = JSON.parse(rowT.data);

                    var found = false;
                    var foundI;

                    for (i = 0; i < data.length; i++) {
                        if (data[i].name == args[0]) {
                            found = true;
                            foundI = i;
                        }
                    }

                    if (!found) return msg.reply("Oops! That tag doesn't exist!");

                    delete data[foundI];

                    var newData = JSON.stringify(data);

                    sql.run("REPLACE INTO tags (guildID, data) VALUES (?, ?)", [msg.guild.id, newData])
                        .then(rowTT => {
                            msg.reply('Removed tag **' + args[0] + "**.");
                            return;
                        });
                });
        });
}