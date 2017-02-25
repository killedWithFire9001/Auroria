exports.desc = "GraalOnline Zone Staff can use this command!";
exports.syntax = "zone (cmd) [args]"

var main = require("../bot.js");
var Discord = require("discord.js");

var events = new Array(
	"GraalMan",
	"Trivia",
	"Gravity Race",
	"Snow Race",
	"Water Race",
	"Toilet Grab",
	"Box Race",
	"British Bulldog",
	"Spar DM",
	"Chance",
	"Floors",
	"Sugar Rush",
	"Alien Race",
	"Frenzy",
	"Portal",
	"Lucky Platform",
	"Water Race 2",
	"Platform Race",
	"Trap Race",
	"Lucky Grab"
);

var zoneAdmins = new Array(
	"122636185901203456",
	"254716296992653322",
	"196499004115255297",
	"88352514558164992"
);

exports.run = function (msg) {
	var bot = main.bot;

	main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
		.then(row => {
			var cmd = row.prefix;

			var args = msg.content.replace(cmd + "zone ", '').split(' ');

			if (zoneAdmins.indexOf(msg.author.id) < 0) {
				msg.reply("Error: You are not a Zone Staff Member!");
				return;
			}

			if (args[0].toLowerCase() == "pickevent") {
				var eventResult = Math.floor(Math.random() * events.length);

				msg.reply("I have made a decision... Event: **" + events[eventResult] + "**!");
				return;
			} else if (args[0].toLowerCase() == "discordlist") {
				let tosend = [];

				for (i = 0; i < zoneAdmins.length; i++) {
					tosend.push(bot.users.get(zoneAdmins[i]).username + "#" + bot.users.get(zoneAdmins[i]).discriminator);
				}

				msg.reply("Staff (That have access to this command)\n" + tosend.join(", "));
				return;
			} else {
				msg.reply("Syntax: " + this.syntax + ".\nCommands: ```pickevent, discordlist```");
				return;
			}
		});
}