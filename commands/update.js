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

                    if (!stdout.includes("Already up-to-date.")) {
                        console.log(msg.author.username + "#" + msg.author.discriminator + " has installed an update from GitHub directly to the Bot!");
                        m.edit("Done. *(You will need to run the restart command now)* - Response:\n```" + stdout + "```");
                    } else if (stdout.includes("Already up-to-date.")) {
                        m.edit("Oops! Bot is already up-to-date! Response:\n```" + stdout + "```");
                    } else {
                        m.edit('? - Response:\n````' + stdout + '````');
                    }
                    return;
                });
            });
        return;
    } else {
        msg.reply("You are not a Global Admin!");
        return;
    }
}