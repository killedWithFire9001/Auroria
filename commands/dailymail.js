exports.desc = "View the latest news for Daily Mail!";
exports.syntax = "dailymail"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var unirest = main.unirest;

  unirest.get('https://newsapi.org/v1/articles?source=daily-mail&sortBy=latest&apiKey=' + main.auth["news-token"])
  .end(function(response) {
  	if (response.body.status != "ok") {
  		msg.reply("Error with API request. Try again later- :/");
  		return;
  	}

  	var article = response.body.articles[0];

  	const embed = new Discord.RichEmbed()
  		.setTitle('Daily Mail: ' + article.title)
  		.setAuthor( article.author, "" )
  		.setColor([121, 212, 242])
  		.setDescription( article.description )
  		.setFooter( "", "" )
  		.setImage( article.urlToImage )
 		  .setThumbnail( "" )
  		.setTimestamp( '' )
  		.setURL( article.url );

  	msg.channel.sendEmbed(embed, '', { disableEveryone: true });
  });

}