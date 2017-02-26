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
                    var data;

                    if (!rowT) {
                        data = [];

                        data.push({
                            name: args[0],
                            content: msg.content.replace(cmd + "addtag ", "").replace(args[0], "")
                        });

                        var newData = JSON.stringify(data);

                        sql.run("INSERT INTO tags VALUES (?, ?)", [msg.guild.id, newData])
                            .then(rowTT => {
                                msg.reply('Created tag **' + args[0] + "**.");
                                return;
                            });
                    } else {
                        data = JSON.parse(rowT.data);

                        var found = false;
                        var foundI;

                        for (i = 0; i < data.length; i++) {
                            if (typeof data[i] == "null" || typeof data[i] == "undefined" || data.length == 0) {
                                found = false;
                                
                                data.push({
                                    "name": args[0],
                                    "content": msg.content.replace(cmd + "addtag ", "").replace(args[0], "")
                                });

                                var newData = JSON.stringify(data);

                                sql.run("UPDATE tags SET data ='" + newData + "' WHERE guildID ='" + msg.guild.id + "'")
                                    .then(rowTT => {
                                        msg.reply('Created tag **' + args[0] + "**.");
                                        return;
                                    });
                                return;
                            } else {
                                if (data[i].name == args[0]) {
                                    found = true;
                                    foundI = i;
                                }
                            }
                        }

                        if (found) return msg.reply("Oops! That tag already exists! (Found **" + data[foundI].name + "**)");

                        data.push({
                            "name": args[0],
                            "content": msg.content.replace(cmd + "addtag ", "").replace(args[0], "")
                        });

                        var newData = JSON.stringify(data);

                        sql.run("UPDATE tags SET data ='" + newData + "' WHERE guildID ='" + msg.guild.id + "'")
                            .then(rowTT => {
                                msg.reply('Created tag **' + args[0] + "**.");
                                return;
                            });
                    }
                });
        });
}