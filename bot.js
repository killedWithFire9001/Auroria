// Generic shit that has to be here.
var Discord = require("discord.js");
exports.Discord = Discord;
var ytdl = require('ytdl-core');
var opus = require('opusscript');
var searchYT = require('youtube-search');
exports.searchYT = searchYT;
exports.ytdl = ytdl;
const fs = require("fs")
exports.fs = fs;

var commands = new Array(
  "help",
  "info",
  "invite",
  "credits",
  "serverinfo",
  "servers",
  "ping",
  "uptime",
  "avatar",
  "rps",
  "rolldice",
  "flipcoin",
  "cleverbot",
  "8ball",
  "urban",
  "yoda",
  "lovecalc",
  "iplookup",
  "connect",
  "disconnect",
  "queue",
  "remqueue",
  "playsong",
  "pause",
  "resume",
  "skip",
  "volume",
  "prune",
  "kick",
  "ban",
  "setprefix",
  "restart",
  "die"
)

exports.commands = commands;

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
exports.config = config;

var imgurv = require('imgur-search');
var imgur = new imgurv("2816035836970a2");
var cleverbot = require("cleverbot.io");
var CBOT = new cleverbot("n3dJN5BLz6Nk87MR", "LvuK3c9MqmnVG8EeG4uX4YtRoUowC0tU");
exports.CBOT = CBOT;
var unirest = require('unirest');
exports.unirest = unirest;
var bot = new Discord.Client();
exports.bot = bot;
var botToken = "MjU0NTE4MzI1NDc0ODg1NjMy.CyQOMA.eqw0FeAYpdhDbER-khs0lVbHQQA";
var botId = "254518325474885632";

var isRestartSure = false;
// Makes my life 100x easier.
var myServerId = "236748766835769344";

// MUSIC PART APPLICATION LINK
var musicApplyLink = "xrubyy.xyz/app";
var musQueue = {};

// Dont touch pls
var canPrune = true;

// Bad words. Add more if you want, Bullet.
var badWords = new Array(
  "fuck",
  "nigaa",
  "fk",
  "fuk",
  "fuked",
  "shit",
  "sh1t",
  "shite",
  "shiit",
  "sht",
  "cunt",
  "bitch",
  "b1tch",
  "btch",
  "asshole",
  "dik",
  "dick",
  "d1k",
  "d1ck",
  "penis",
  "pen1s",
  "fak",
  "shet",
  "dildo",
  "pussy",
  "porn",
  "pornhub",
  "xvideos",
  "pornmd",
  "nigger",
  "nigga",
  "n1gger",
  "n1gga",
  "c|_|nt"
)

var magicEightBall = new Array(
  'As I see it, yes',
  'Better not tell you now',
  'Cannot predict now',
  'Don\'t count on it',
  'If you say so',
  'In your dreams',
  'It is certain',
  'Most likely',
  'Out of psychic coverage range',
  'Signs point to yes',
  'Sure, sure',
  'Shake harder and ask again',
  'Sorry, Ask again',
  'Ask again later',
  'Very doubtful',
  'Without a doubt',
  'Yes, definitely',
  'You can\'t handle the truth'
)

//-----------------------------------------------
exports.globalAdmin = new Array(
  "122636185901203456", // Thomas (me)
  "199417447424458762"  // Bullet
)

// Add any guild ids (That you can get from !grabid) that are abusing the bot or just are dicks and don't deserve
// to be allowed use it.
// Also put the reason below on the other array (make sure they both are on the same line number in the Array)
var blacklistedGuilds = new Array(
  "258732399825911808" // RISEN SQUAD
)

var blacklistReason = new Array(
  "Absusing the bot's commands/features" // RISEN SQUAD
)

// Music Bot - Whitelisted Guild IDs
var musicBotGuilds = new Array(
  "236748766835769344",  // Auroria
  "254493265988943872",  // MysteryES (Andrew's Server for his CSGO team or whatever.)
  "261314850213462016",  // Risen Squad, Another CS:GO team that Andrew is helping.
  "194348087907450881",  // Providence (Tarkus' Friends server.)
  "262078744057872404",  // Friend's Server
  "149752455054360576",  // VHS7
  "275650408481947648"   // A Rainbow Dude's server
)

exports.musicBotGuilds = musicBotGuilds;
exports.musQueue = musQueue;
exports.magicEightBall = magicEightBall;
//-----------------------------------------------

var flipACoin = new Array(
  "Heads",
  "Tails"
)

exports.flipACoin = flipACoin;

var rollADice = new Array(
  "1",
  "2",
  "3",
  "4",
  "5",
  "6"
)

exports.rollADice = rollADice;

var randGameNum = 0;
var randGame = "";

// Ready
bot.on('ready', () => {
  console.log(`--=--=-- BOT ONLINE --=--=-- (${bot.guilds.size} servers)`);
  var serversActual = Array.from(bot.guilds.values());
  console.log(`List of servers:\n${serversActual}\n\nGlobal Admins (${this.globalAdmin.length}):\n${this.globalAdmin}\n\nBlacklisted Servers (${blacklistedGuilds.length}):\n${blacklistedGuilds}\n\nLog Start:\n\n`);

  CBOT.setNick("Auroria-DBOTSession");
  CBOT.create(function (err, session) {
  	console.log("Cleverbot, initialized");
  });

  setTimeout(function(){
    console.log("Setting game.");
    bot.user.setGame('!help | on ' + bot.guilds.size + ' servers.', '');
    console.log("Set game.");
  }, 5000);

  setInterval(function() {
      randGameNum = getRandomInt(0, 4);
      randGame = "bug";

      if (randGameNum == 0) {
      	randGame = "on " + bot.guilds.size + " servers.";
      } else if (randGameNum == 1) {
      	randGame = "on VHS7";
      } else if (randGameNum == 2) {
        randGame = "with Gayna";
      } else if (randGameNum == 3) {
        randGame = "on my own";
      } else if (randGameNum == 4) {
        randGame = "with a knife";
      }

      console.log("Setting game to: " + randGame);
      bot.user.setGame("!help | " + randGame, '');
    }, 15000);

  for (i = 0; i < blacklistedGuilds.length; i++) {
    let guild = bot.guilds.get(blacklistedGuilds[i]);
    let reason = blacklistReason[i];

    if (guild == null) {
      return;
    }

    const blacklistedEmbed = new Discord.RichEmbed()
  					.setTitle('-=-=-=-= Error -=-=-=-=')
  					.setAuthor( bot.user.username, bot.user.avatarURL )
  					.setColor([255, 28, 28])
  					.setDescription(`This server (**${guild.name}**) is **blacklisted** from using this bot.`)
  					.setFooter('', '')
  					.setImage( "" )
  					.setThumbnail( "https://s30.postimg.org/54ubfngfl/dc0a6320d907631d34e6655dff176295.png" )
  					.setTimestamp( '' )
  					.setURL('')
  					.addField(`-> Reason`, `**${reason}**`);

    console.log("I am on blacklisted server " + guild.name + "!");
    guild.defaultChannel.sendEmbed(blacklistedEmbed, '', { disableEveryone: true });
    guild.defaultChannel.sendMessage("Disconnecting...");

    setTimeout(function(){
      guild.leave();
      console.log("I have left the blacklisted server: " + guild.name + "!\n");
    }, 2000);
  }
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

bot.on("guildMemberAdd", member => {
    member.sendMessage("Hello, I am Auroria, the/one of the Bot(s) on the server. I am created by Thomas! (More info in !credits). You can check out my commands by typing !commands. Enjoy your stay on the server!");
    member.guild.defaultChannel.sendMessage("Welcome, <@" + member.id + ">, to **" + member.guild.name + "**!");
    return;
});

bot.on("guildBanAdd", (guild, user) => {
    guild.defaultChannel.sendMessage("**Server Ban**: " + user.username + " was just banned.");
    console.log(user.username + " was just banned from " + guild.name + "!");
    return;
});

bot.on("guildBanRemove", (guild, user) => {
    guild.defaultChannel.sendMessage("**Server Un-Ban**: " + user.username + " was just unbanned.");
    console.log(user.username + " was just un-banned from " + guild.name + "!");
    return;
});

bot.on("guildCreate", guild => {
    console.log("I have just joined " + guild.name + "!");
    if (guild.members.size >= 50 && guild.members.size < 100) {
      console.log("We are on a LARGE guild (More than 50 members - " + guild.name + ").");
    }

    if (guild.members.size >= 100) {
      console.log("I am on an EXTRA LARGE guild (More than 100 members - " + guild.name + ").")
    }

    //BLACKLIST START
     for (i = 0; i < blacklistedGuilds.length; i++) {
    let guild = bot.guilds.get(blacklistedGuilds[i]);
    let reason = blacklistReason[i];

    if (guild == null) {
      return;
    }

    const blacklistedEmbed = new Discord.RichEmbed()
  					.setTitle('-=-=-=-= Error -=-=-=-=')
  					.setAuthor( bot.user.username, bot.user.avatarURL )
  					.setColor([255, 28, 28])
  					.setDescription(`This server (**${guild.name}**) is **blacklisted** from using this bot.`)
  					.setFooter('', '')
  					.setImage( "" )
  					.setThumbnail( "https://s30.postimg.org/54ubfngfl/dc0a6320d907631d34e6655dff176295.png" )
  					.setTimestamp( '' )
  					.setURL('')
  					.addField(`-> Reason`, `**${reason}**`);

    console.log("I am on blacklisted server " + guild.name + "!");
    guild.defaultChannel.sendEmbed(blacklistedEmbed, '', { disableEveryone: true });
    guild.defaultChannel.sendMessage("Disconnecting...");

    setTimeout(function(){
      guild.leave();
      console.log("I have left the blacklisted server: " + guild.name + "!\n");
    }, 2000);
    return;
  }
    //BLACKLIST END

    guild.defaultChannel.sendMessage("**Hello**! Thank you for adding me to your server.\nI am a Bot created by **Thomas#5368**! (*See !credits*).\nI have lots of features and commands to assist you! (*See !commands*).");


    bot.guilds.get("236748766835769344").channels.get("259456623297298433").sendMessage("**[Server Join]**\n**Name:** "+ guild.name + ".\n**Member Count:** " + guild.members.size + ".");
    return;
});

bot.on("guildDelete", guild => {
    console.log("I have just left " + guild.name + "!");
    let isBlacklisted = false;
    for (i = 0; i < blacklistedGuilds.length; i++) {
      if (blacklistedGuilds[i] == guild.id) {
        isBlacklisted = true;
      }
    }

    if (isBlacklisted) {
      return;
    } else {
      guild.owner.sendMessage(`**Hello**,\nI just noticed that I was kicked from your server (${guild.name}).\nAll I want to know is why I was kicked. Was it something wrong with the bot? A bug? A feature was missing that you wanted? You didn't like a certain feature?\nI'd like you to tell me. If you can, please write (In this DM) why you didn't want me on your server. Thanks\n-Thomas.`);
    }

    bot.guilds.get("236748766835769344").channels.get("259456623297298433").sendMessage("**[Server Leave]**\n**Name:** "+ guild.name + ".\n**Member Count:** " + guild.members.size + ".");
    return;
});

bot.on("error", error => {
   console.log("Error: " + error);
});

// Message event
bot.on("message", msg => {

  if (msg.channel.type == "dm" || msg.channel.type == "group") {
    if (msg.author.id == botId) {
      return;
    }

    console.log(msg.author.username + " ("+ msg.author.id +") said on DM: " + msg.content);
    return;
  }

  if (msg.author.bot) {
  	return;
  }

  var cmd = "";
  if (config["prefix_" + msg.channel.guild.id] == null || config["prefix_" + msg.channel.guild.id] == undefined) {
    config["prefix_" + msg.channel.guild.id] = "!";
    fs.writeFile('./config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
    cmd = "!";
  } else {
    cmd = config["prefix_" + msg.channel.guild.id];
  }

//--------------------------------------------------------------------------------------------------------------------------

      // Swear Words
      let length = badWords.length;
      var canSwear = false;
      while(length--) {
        if (msg.content.toLowerCase().indexOf(badWords[length])!=-1) {
          if (!msg.content.toLowerCase().includes(cmd + "playsong")) {
          if (msg.channel.guild.id == "110373943822540800" || msg.channel.guild.id == "254493265988943872" || msg.channel.guild.id == "149752455054360576" || msg.author.id == botId || msg.channel.guild.id == "194348087907450881") { // Disable on Discord Bots and misc. servers that don't want it
            canSwear = true;
          } else {
          	canSwear = false;
          }

          if (msg.content.toLowerCase().indexOf("afk") || !msg.content.startsWith(cmd)) {
          		if (!canSwear) {
          		 console.log(`${msg.author.username} has just swore on ${msg.channel.guild.name}`);

          		 msg.reply(":rage: **Swearing is NOT allowed!** :rage:")
          		 .then(mesg => {
          			setTimeout(function() {
          				mesg.delete();
          			}, 5000);
          		});

         		 msg.delete().catch(console.error);
          		return;
          	}
          }
         }
       }
      }

     // Lenny
     if (msg.content.toLowerCase().indexOf("(lenny)")!=-1) {
       msg.channel.sendMessage("( ͡° ͜ʖ ͡° )");
       return;
     }

//--------------------------------------------------------------------------------------------------------------------------

    // Commands
    var args = msg.content.slice(cmd.length).split(" ");

    if (!msg.content.startsWith(cmd)) return;

    if (commands.indexOf(args[0]) != -1) {
      if (args[0] == "skip" || args[0] == "volume" || args[0] == "resume" || args[0] == "pause") return;

      var file = require("./commands/" + args[0] + ".js");

      file.run(msg);
      return;
    } else if(msg.content.startsWith(cmd) && commands.indexOf(args[0]) == -1) {
      msg.reply('That command does not exist!');
      return;
    }
});

// And finally, login.
bot.login(botToken);
