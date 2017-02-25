exports.desc = "Pull updates from GitHub (Requires Global Admin)";
exports.syntax = "update"

var main = require("../bot.js");
var Discord = require("discord.js");

var sys = require('sys')
var exec = require('child_process').exec;

exports.run = function (msg) {
    if (main.globalAdmin.indexOf(msg.author.id) != -1) {
        msg.channel.sendMessage("Updating!")
            .then(m => {
                exec("git pull origin master", function (error, stdout, stderr) {
                    if (error) {
                        m.edit("Error: `" + stderr + "`");
                        return;
                    }

                    m.edit("Done. *(You will need to run the restart command now)* - Response:\n```" + stdout + "```");
                });
            })
        return;
    } else {
        msg.reply("You are not a Global Admin!");
        return;
    }
}