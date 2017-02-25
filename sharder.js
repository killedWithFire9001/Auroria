const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./bot.js', { totalShards: 2 });
exports.Manager = Manager;

Manager.spawn();