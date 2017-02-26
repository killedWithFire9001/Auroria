exports.desc = "View all available tags on this server.";
exports.syntax = "tags"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
    var bot = main.bot;
    var sql = main.sql;

    sql.get("SELECT * FROM tags WHERE guildID ='" + msg.guild.id + "'")
        .then(row => {
            let toSend = [];

            if (!row) {
                toSend.push("**None!**");
                msg.reply("All available tags for **" + msg.guild.name + "**:\n" + toSend.join(", "));
                return;
            } else {
                let data = JSON.parse(row.data);

                if (data == null || data == undefined) {
                    toSend.push("**None!**");
                } else {
                    for (i = 0; i < data.length; i++) {
                        if (data[i] !== undefined || data[i] !== null) {
                            toSend.push(data[i].name);
                        }
                    }
                }

                msg.reply("All available tags for **" + msg.guild.name + "**:\n" + toSend.join(", "));
            }
        });
}