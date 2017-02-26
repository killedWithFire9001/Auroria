exports.desc = "View a list of tags for this server.";
exports.syntax = "tags"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
    var bot = main.bot;
    var sql = main.sql;

    sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
        .then(row => {
            var cmd = row.prefix;

            sql.get("SELECT * FROM tags WHERE guildID ='" + msg.guild.id + "'")
                .then(rowT => {
                    var data = JSON.parse(rowT.data);

                    if (data == null || data == undefined || !rowT || rowT.data == null || rowT.data == undefined) return msg.reply("No tags available to view!");

                    let toSend = [];

                    for (i = 0; i < data.length; i++) {
                        if (data[i] != undefined || data[i].name != null) {
                            toSend.push(data[i].name)
                        }
                    }

                    msg.channel.sendMessage("Available tags for **Auroria**:\n" + toSend.join(", "));
                });
        });
}