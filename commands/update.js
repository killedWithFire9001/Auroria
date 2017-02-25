exports.desc = "Pull updates from GitHub";
exports.syntax = "update"

var main = require("../bot.js");
var Discord = require("discord.js");

var sys = require('sys')
var exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout) }

exports.run = function (msg) {
    if (main.globalAdmin.indexOf(msg.author.id) != -1) {
        msg.channel.sendMessage("Updating!");
        exec("git pull origin master", function(error, stdout, stderr) {
            msg.reply("Done. `" + stdout + "`");
        });
        return;
    } else {
        msg.reply("You are not a Global Admin!");
        return;
    }
}