exports.desc = "Pull updates from GitHub";
exports.syntax = "update"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
    if (main.globalAdmin.indexOf(msg.author.id) != -1) {
        msg.channel.sendMessage("Updating!");
        run_cmd("git", "pull origin master", function(resp) {
            msg.reply("Done! `" + resp + "`");
        });
        return;
    } else {
        msg.reply("You are not a Global Admin!");
        return;
    }
}

// Taken from http://stackoverflow.com/questions/14458508/node-js-shell-command-execution
// Thanks?
function run_cmd(cmd, args, callBack) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function () { callBack(resp) });
} 