exports.desc = "Begin playing a song (provide a link) OR search for a song to play (query)";
exports.syntax = "play (link OR query)"

var main = require("../bot.js");
var Discord = require("discord.js");
var bot = main.bot;
var searchYT = main.searchYT;
var ytdl = main.ytdl;
var musQueue = main.musQueue;

exports.run = function (msg) {
  var cmd;
  msg.delete();

  main.sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
    .then(row => {
      cmd = row.prefix;

      if (bot.voiceConnections.get(msg.guild.id) == null || bot.voiceConnections.get(msg.guild.id) == undefined) {
        if (bot.voiceConnections.size >= 5) {
          msg.reply(":musical_note: :no_entry_sign: Error.\nThe bot has reached the maximum amount of Voice Connections (across all connected guilds). Please try again later when a slot might be available!");
          return;
        }

        if (!msg.member.voiceChannel) {
          msg.reply("Please be in a voice channel before running this command so I can connect! *(Or run " + cmd + "connect)*");
          return;
        }

        let sender;
        if (msg.guild.member(msg.author).nickname == null) {
          sender = msg.author.username;
        } else {
          sender = msg.guild.member(msg.author).nickname;
        }

        const connectedEmbed = new Discord.RichEmbed()
          .setTitle('')
          .setAuthor(sender, msg.author.avatarURL)
          .setColor(0x00AE86)
          .setDescription('')
          .setFooter('', '')
          .setImage('')
          .setThumbnail("")
          .setTimestamp("")
          .setURL('')
          .addField('\nStatus:', "Connected to your voice channel!");

        msg.member.voiceChannel.join()
          .then(() => {
            msg.channel.sendEmbed(connectedEmbed, '', { disableEveryone: true });
          });
      }

      const input = msg.content.replace(cmd + 'play ', '');
      const streamOptions = { seek: 0, volume: 1 };

      // ---------QUEUE ADD------------
      if (input.startsWith("https:") || input.startsWith("www.") || input.startsWith("youtube.com") || input.startsWith("http:")) {

        const voiceChan = msg.member.voiceChannel;
        let url = msg.content.replace(cmd + 'play ', '');
        var sender = "";

        const incUrl = new Discord.RichEmbed()
          .setTitle('-=-=-=-= Error -=-=-=')
          .setAuthor(sender, msg.author.avatarURL)
          .setColor(0x00AE86)
          .setDescription('\n')
          .setFooter('', '')
          .setImage("")
          .setThumbnail()
          .setTimestamp('')
          .setURL('')
          .addField("-> Invalid URL", `**${url}** is not a valid YouTube URL.`);

        if (msg.channel.guild.member(msg.author).nickname == null) {
          sender = msg.author.username;
        } else {
          sender = msg.channel.guild.member(msg.author).nickname;
        }

        if (url == '' || url === undefined || !url.includes("youtube.com")) {
          msg.channel.sendEmbed(incUrl, '', { disableEveryone: true })
            .then(mesg => {
              setTimeout(function () {
                mesg.delete();
              }, 10000);
            });
          return;
        }

        ytdl.getInfo(url, (err, info) => {
          if (err) {
            return msg.channel.sendMessage("***___" + err + "___***");
          }

          if (url == '' || url === undefined) {
            msg.channel.sendEmbed(incUrl, '', { disableEveryone: true })
              .then(mesg => {
                setTimeout(function () {
                  mesg.delete();
                }, 10000);
              });
          }

          if (typeof musQueue[msg.channel.guild.id] == "undefined") {
            musQueue[msg.channel.guild.id] = [
              {
                "url": "",
                "title": "",
                "requester": ""
              }
            ];
          }

          let sender = "";
          if (msg.channel.guild.member(msg.author).nickname == null) {
            sender = msg.author.username;
          } else {
            sender = msg.channel.guild.member(msg.author).nickname;
          }

          const songAdded = new Discord.RichEmbed()
            .setTitle('-=-=-=-= Song Added -=-=-=-=')
            .setAuthor(sender, msg.author.avatarURL)
            .setColor(0x00AE86)
            .setDescription(`\nQueued **[${info.title}](${url})**.\nRequested by **${sender}**`)
            .setFooter('', '')
            .setImage("")
            .setThumbnail(info.thumbnail_url)
            .setTimestamp('')
            .setURL('');

          msg.channel.sendEmbed(
            songAdded,
            '',
            { disableEveryone: true }
          );

          musQueue[msg.channel.guild.id].push({
            url: url,
            title: info.title,
            requester: sender
          });
          if (musQueue[msg.channel.guild.id].playing) return;
          play(musQueue[msg.guild.id][1], msg, cmd);
        });
      } else {
        var opts = {
          maxResults: 5,
          type: 'video',
          key: main.auth["yt-s_key"]
        };

        searchYT(msg.content.replace(cmd + "play ", ""), opts, function (err, results) {
          if (err) return msg.channel.sendMessage("Error whilst searching.\n\`\`\`" + err + "\`\`\`");
          var url = results[0].link;

          ytdl.getInfo(url, (err, info) => {
            if (err) {
              return msg.channel.sendMessage("***___" + err + "___***");
            }

            if (typeof musQueue[msg.channel.guild.id] == "undefined") {
              musQueue[msg.channel.guild.id] = [
                {
                  "url": "",
                  "title": "",
                  "requester": ""
                }
              ];
            }

            let sender = "";
            if (msg.channel.guild.member(msg.author).nickname == null) {
              sender = msg.author.username;
            } else {
              sender = msg.channel.guild.member(msg.author).nickname;
            }

            const songAdded = new Discord.RichEmbed()
              .setTitle('-=-=-=-= Song Added -=-=-=-=')
              .setAuthor(sender, msg.author.avatarURL)
              .setColor(0x00AE86)
              .setDescription(`\nQueued **[${info.title}](${url})**.\nRequested by **${sender}**`)
              .setFooter('', '')
              .setImage("")
              .setThumbnail(info.thumbnail_url)
              .setTimestamp('')
              .setURL('');

            msg.channel.sendEmbed(
              songAdded,
              '',
              { disableEveryone: true }
            );

            musQueue[msg.channel.guild.id].push({
              url: url,
              title: info.title,
              requester: msg.guild.member(msg.author).displayName
            });

            if (musQueue[msg.guild.id].playing) return;
            play(musQueue[msg.guild.id][1], msg, cmd);
          });
        });
        return;
      }
    })
}


function play(song, msg, cmd) {
  let sender = "";

  if (msg.channel.guild.member(msg.author).nickname == null) {
    sender = msg.author.username;
  } else {
    sender = msg.channel.guild.member(msg.author).nickname;
  }

  const queueCompleted = new Discord.RichEmbed()
    .setTitle('Queue Complete')
    .setAuthor("", "")
    .setColor(0x00AE86)
    .setDescription('\n**Disconnecting from Voice Channel**')
    .setFooter('', '')
    .setImage("")
    .setThumbnail("")
    .setTimestamp('')
    .setURL('')
    .addField("-> Note", "Enjoying the music bot? Need help? Join the discord server- **[Here](http://discord.me/auroria)**");

  if (song == undefined || musQueue[msg.guild.id][1] === undefined) return msg.channel.sendEmbed(queueCompleted, '', { disableEveryone: true }).then(() => {
    musQueue[msg.channel.guild.id].playing = false;
    musQueue[msg.channel.guild.id].current = "None";
    bot.voiceConnections.get(msg.guild.id).channel.leave();
    console.log("Music> Queue completed on " + msg.guild.id + "!");
    return;
  });

  ytdl.getInfo(song.url, (err, info) => {
    const stream = ytdl(song.url, { filter: 'audioonly' });
    const streamOptions = { seek: 0, volume: 1, passes: 2 };
    var dispatcher = msg.guild.voiceConnection.playStream(stream, streamOptions);

    if (musQueue[msg.guild.id].volume === undefined) {
      musQueue[msg.guild.id].volume = 1;
      dispatcher.setVolume(1);
    } else {
      dispatcher.setVolume(musQueue[msg.guild.id].volume);
    }

    var time = info.length_seconds;
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    const songPlaying = new Discord.RichEmbed()
      .setTitle('Now playing in ' + bot.voiceConnections.get(msg.guild.id).channel.name)
      .setAuthor("", "")
      .setColor(0x00AE86)
      .setDescription(`**Now Playing: [${song.title}](${song.url})** | ${minutes}:${seconds}\nRequested by **${song.requester}**`)
      .setFooter('', '')
      .setImage("")
      .setThumbnail(info.thumbnail_url)
      .setTimestamp("")
      .setURL('');

    dispatcher.on('start', () => {
      msg.channel.sendEmbed(songPlaying, '', { disableEveryone: true });

      console.log("Music> Playing: " + song.title + " on " + msg.channel.guild.name + ". Requested by " + song.requester + ".");
      musQueue[msg.channel.guild.id].playing = true;
      musQueue[msg.channel.guild.id].current = song.title;
    });

    /*
    dispatcher.on('speaking', (value) => {

    });
    */

    dispatcher.on('end', () => {
      musQueue[msg.channel.guild.id].playing = false;
      musQueue[msg.channel.guild.id].shift();
      collector.stop();

      console.log("Music> Finished Playing: " + song.title + " on " + msg.channel.guild.name + ". Requested by " + song.requester + ".");
      musQueue[msg.channel.guild.id].current = "None";
      play(musQueue[msg.channel.guild.id][1], msg, cmd);
    });

    dispatcher.on('error', (err) => {
      console.error("Music> An error occured on " + msg.channel.guild.name + ". '" + err + "'.");
      msg.reply("An error has occured.\n\`\`\`" + err + "\`\`\`");
      voiceChan.leave();
      console.log(err);
    });

    let collector = msg.channel.createCollector(m => m);
    collector.on('message', m => {
      let sender = "";

      if (m.channel.guild.member(m.author).nickname == null) {
        sender = m.author.username;
      } else {
        sender = m.channel.guild.member(m.author).nickname;
      }

      const pauseEm = new Discord.RichEmbed()
        .setTitle('')
        .setAuthor("", "")
        .setColor([83, 210, 252])
        .setDescription(`\nMusic was paused by **${m.author.username}**`)
        .setFooter('', '')
        .setImage("")
        .setThumbnail("")
        .setTimestamp('')
        .setURL('');

      const resumeEm = new Discord.RichEmbed()
        .setTitle('')
        .setAuthor("", "")
        .setColor([83, 210, 252])
        .setDescription(`\nMusic queue was resumed by **${m.author.username}**`)
        .setFooter('', '')
        .setImage("")
        .setThumbnail("")
        .setTimestamp('')
        .setURL('');

      const skipEm = new Discord.RichEmbed()
        .setTitle('')
        .setAuthor("", "")
        .setColor([83, 210, 252])
        .setDescription(`\nMusic was skipped by **${m.author.username}**`)
        .setFooter('', '')
        .setImage("")
        .setThumbnail("")
        .setTimestamp('')
        .setURL('');

      if (m.content.startsWith(cmd + 'pause')) {
        if (m.guild.roles.find("name", "Staff") == null) {
          m.reply('```An error has occured\nReason: Role: Staff does not exist. Contact the server owner and get him/her to create it.```')
          return;
        }

        if (!(m.member.roles.has(msg.guild.roles.find("name", "Staff").id))) {
          m.reply('```You can not run this command\nReason: You are not in the correct permission role [Staff]```');
          return;
        }

        m.delete();
        msg.channel.sendEmbed(pauseEm, '', { disableEveryone: true });
        dispatcher.pause();
        return;
      } else if (m.content.startsWith(cmd + 'resume')) {
        if (m.guild.roles.find("name", "Staff") == null) {
          m.reply('```An error has occured\nReason: Role: Staff does not exist. Contact the server owner and get him/her to create it.```')
          return;
        }

        if (!(m.member.roles.has(msg.guild.roles.find("name", "Staff").id))) {
          m.reply('```You can not run this command\nReason: You are not in the correct permission role [Staff]```');
          return;
        }

        m.delete();
        msg.channel.sendEmbed(resumeEm, '', { disableEveryone: true });
        dispatcher.resume();
        return;
      } else if (m.content.startsWith(cmd + 'skip')) {
        if (m.guild.roles.find("name", "Staff") == null) {
          m.reply('```An error has occured\nReason: Role: Staff does not exist. Contact the server owner and get him/her to create it.```')
          return;
        }

        if (!(m.member.roles.has(msg.guild.roles.find("name", "Staff").id))) {
          m.reply('```You can not run this command\nReason: You are not in the correct permission role [Staff]```');
          return;
        }
        m.delete();
        msg.channel.sendEmbed(skipEm, '', { disableEveryone: true });
        dispatcher.end();
        return;
      } else if (m.content.startsWith(cmd + 'volume')) {
        if (m.guild.roles.find("name", "Staff") == null) {
          m.reply('```An error has occured\nReason: Role: Staff does not exist. Contact the server owner and get him/her to create it.```')
          return;
        }

        if (!(m.member.roles.has(msg.guild.roles.find("name", "Staff").id))) {
          m.reply('```You can not run this command\nReason: You are not in the correct permission role [Staff]```');
          return;
        }

        m.delete();
        let volume = m.content.replace(cmd + "volume ", '');

        if (isNaN(volume)) return m.reply("That is not a number, stupid! :cry:");

        if (volume > 2 || volume < 0) {
          m.reply('Volume must be between 0 and 2! (0% and 100%)');
          return;
        }

        dispatcher.setVolume(volume);
        let volPerc = Math.round(dispatcher.volume * 50);

        const volumeEm = new Discord.RichEmbed()
          .setTitle('')
          .setAuthor("", "")
          .setColor([83, 210, 252])
          .setDescription(`\nMusic volume was changed to **${volume} || ${volPerc}** by **${m.author.username}**`)
          .setFooter('', '')
          .setImage("")
          .setThumbnail("")
          .setTimestamp('')
          .setURL('');

        msg.channel.sendEmbed(volumeEm, '', { disableEveryone: true });
        musQueue[msg.guild.id].volume = volume;
        return;
      }
    });
  });
}