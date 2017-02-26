exports.desc = "Add a tag.";
exports.syntax = "addtag (name) (content)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
    var bot = main.bot;
    var sql = main.sql;

    if (!msg.guild.member(msg.author).hasPermission("MANAGE_MESSAGES")) return msg.reply('You need the MANAGE MESSAGES permission to run this command!');

    sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
        .then(row => {
            var cmd = row.prefix;
            var args = msg.content.replace(cmd + "addtag ", "").split(" ");

            if (args.length < 2) {
                msg.reply("Invalid argument size! Syntax: **" + this.syntax + "**.");
                return;
            }

            sql.get("SELECT * FROM tags WHERE guildID ='" + msg.guild.id + "'")
                .then(rowT => {
                    var data = JSON.parse(rowT.data);

                    var found = false;
                    var foundI;

                    for (i = 0; i < data.length; i++) {
                        if (data[i] != undefined || data[i].name != null) {
                            if (data[i].name == args[0]) {
                                found = true;
                                foundI = i;
                            }
                        }
                    }

                    if (found) return msg.reply('That tag already exists!');

                    data.push({
                        "name": args[0],
                        "content": msg.content.replace(args[0] + " ", "")
                    });

                    var newData = JSON.stringify(data);

                    sql.run("UPDATE tags SET data ='" + newData + "' WHERE guildID ='" + msg.guild.id + "'")
                        .then(row => {
                            msg.reply(':ok_hand:');
                        })
                });
        });
}