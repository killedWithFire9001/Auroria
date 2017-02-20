exports.desc = "Bot Statistics";
exports.syntax = "stats";

exports.run = function(msg) {
  var main = require("../bot.js");
  var Discord = main.Discord;
  var bot = main.bot;

    const embed = new Discord.RichEmbed()
            .setTitle( '-=-=-=-= Bot Statistics -=-=-=-=' )
            .setAuthor( "", "" )
            .setColor([135, 255, 255])
            .setDescription(`• Mem Usage  :: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}** MB\n• Uptime     :: **${Math.round(bot.uptime/1000)}** seconds\n• Users      :: **${bot.users.size.toLocaleString()}**\n• Servers    :: **${bot.guilds.size.toLocaleString()}**\n• Channels   :: **${bot.channels.size.toLocaleString()}**\n• Discord.js :: v**${Discord.version}**`)
            .setFooter('Bot Statistics | v' + main.info["bot-version"], '')
            .setImage( "" )
            .setThumbnail( "" )
            .setTimestamp( '' )
            .setURL('');

    msg.channel.sendEmbed(embed, '', { disableEveryone: true });
}
