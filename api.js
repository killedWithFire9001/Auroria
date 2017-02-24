var express = require('express');
var app = express();
var main = require('./bot.js');
var sql = main.sql;

exports.run = function() {

  /*

  Blacklisted
  * Params:
  * id: ID of the guild

  returns true/false

  */
  app.get('/blacklisted', function (req, res) {
    console.log("API >>> Recieved request for: /blacklisted from " + req.ip + ".");

    if (req.query.token == undefined) {
      res.status(400).json({error: "Token required"});
      return;
    }

    if (req.query.id == undefined) {
      res.status(400).json({error: "ID required"});
      return;
    }

    let id = req.query.id;
    let token = req.query.token;

    if (token != main.auth["api-token"]) {
      res.status(403).json({error: "Invalid token"});
      return;
    }

    sql.get(`SELECT * FROM blacklist WHERE guildID ='${id}'`).then(row => {
      if (row) {
        res.status(200).json({result: "true"});
      } else {
        res.status(200).json({result: "false"});
      }
    });
  });

  /*
  
  Server Owner
  * Params:
  * id = id of the guild.

  returns id of the owner

  */

  app.get('/serverowner', function (req, res) {
    console.log("API >>> Recieved request for: /serverowner from " + req.ip + ".");

    if (req.query.token == undefined) {
      res.status(400).json({error: "Token required"});
      return;
    }

    if (req.query.id == undefined) {
      res.status(400).json({error: "ID required"});
      return;
    }

    let id = req.query.id;
    let token = req.query.token;

    if (token != main.auth["api-token"]) {
      res.status(403).json({error: "Invalid token"});
      return;
    }

    if (main.bot.guilds.get(id) == null) {
      res.status(400).json({error: "Guild not found"});
      return;
    }

    let owner = main.bot.guilds.get(id).owner.user.id;
    res.status(200).json({result: owner});
    return;
  });

  /*
  
  Server Data
  * Params:
  * id = id of the guild.

  returns server data

  */

  app.get('/serverdata', function (req, res) {
    console.log("API >>> Recieved request for: /serverdata from " + req.ip + ".");

    if (req.query.token == undefined) {
      res.status(400).json({error: "Token required"});
      return;
    }

    if (req.query.id == undefined) {
      res.status(400).json({error: "ID required"});
      return;
    }

    let id = req.query.id;
    let token = req.query.token;

    if (token != main.auth["api-token"]) {
      res.status(403).json({error: "Invalid token"});
      return;
    }

    if (main.bot.guilds.get(id) == null) {
      res.status(400).json({error: "Guild not found"});
      return;
    }

    sql.get(`SELECT * FROM db WHERE guildID ='${id}'`).then(row => {
      res.status(200).json({ guildID: row.guildID, prefix: row.prefix, join_leave: row.joinleave, join_leave_id: row.joinleaveid, invites: row.invites });
    });
    return;
  });

  app.listen(3000, function () {
    console.log('API >>> Listening on port 3000!');
  });
}