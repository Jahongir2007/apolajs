/*
	Apola.js framework for Node.js runtime
	Author: Jahongir Sobirov
	Version: 1.0.0
	License: MIT
	All rights reserved (c) 2021
*/

const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');

function route(path, self){
	if(self['echo'][1]['status'] == false){
		app.get(path[0], (req, res)=> {
			res.send(self['echo'][0]);
		});
	}else{
		app.get(path[0], (req, res)=> {
			res.status(self['echo'][1]['status']).send(self['echo'][0]);
		});
	}
}

function raw(){
	app.use(express.raw());
}

function static(self){
	app.use(express.static(path.join(__dirname, self)));
}

function setFile(self, join){
	app.get(self[0], function(req, res){
		res.sendFile(path.join(__dirname, join['folder'], join['file']));
	});
}

function JSON(self, forjson){
	app.get(self[0], function(req, res){
		res.json(forjson['JSON']);
	});
}

function port(self, event){
	if(event == false){
		app.listen(self);
	}else{
		app.listen(self, ()=> {
			console.log(event); 
		});
	}
}

function create(type, connect, self){
	if(type == "db"){
		var con = mysql.createConnection({
  			host: connect[0],
  			user: connect[1],
  			password: connect[2]
		});

		con.connect(function(err) {
  			if (err) throw err;
  				console.log("Connected!");
  				con.query(`CREATE DATABASE ${self['dbname']}`, function (err, result) {
    				if (err) throw err;
    					console.log("Database created");
  				});
		});
	}else if(type == "table"){
		var con = mysql.createConnection({
  			host: connect[0],
  			user: connect[1],
  			password: connect[2],
  			database: connect[3]
		});

		con.connect(function(err) {
  			if (err) throw err;
  			console.log("Connected!");
  			var sql = `CREATE TABLE ${self['tablename']} (${self['rows']})`;
  			con.query(sql, function (err, result) {
    			if (err) throw err;
    			console.log("Table created");
  			});
		});
	}
}

function insert(type, connect, self){
	if(type == "into"){
			var con = mysql.createConnection({
  				host: connect[0],
  				user: connect[1],
  				password: connect[2],
  				database: connect[3]
			});

			con.connect(function(err) {
  			if (err) throw err;
  			console.log("Connected!");
  			var sql = `${self['insert']}`;
  			con.query(sql, function (err, result) {
    			if (err) throw err;
   	 			console.log("Data inserted");
  			});
		});
	}
}

function select(type, connect, self){
	if(type == "from"){
		var con = mysql.createConnection({
  			host: connect[0],
  			user: connect[1],
  			password: connect[2],
  			database: connect[3]
		});

		con.connect(function(err) {
  			if (err) throw err;
  			con.query(`SELECT ${self['select']} FROM ${self['from']}`, function (err, result, fields) {
    			if (err) throw err;
    			console.log(result);
  			});
		});
	}
}

function where(connect, self){
	var con = mysql.createConnection({
  		host: connect[0],
  		user: connect[1],
  		password: connect[2],
  		database: connect[3]
	});

	con.connect(function(err) {
  		if (err) throw err;
  		con.query(`SELECT ${self['select']} FROM ${self['from']} WHERE ${self['where']} = '${self['filter']}'`, function (err, result) {
    		if (err) throw err;
    		console.log(result);
  		});
	});
}

function order(type, connect, self){
	if(type == "by"){
		var con = mysql.createConnection({
  			host: connect[0],
  			user: connect[1],
  			password: connect[2],
  			database: connect[3]
		});

		con.connect(function(err) {
  			if (err) throw err;
  			con.query(`SELECT ${self['select']} FROM ${self['from']} ORDER BY ${self['orderby']}`, function (err, result) {
    			if (err) throw err;
    			console.log(result);
  			});
		});
	}
}

function del(connect, self){
	var con = mysql.createConnection({
  		host: connect[0],
  		user: connect[1],
  		password: connect[2],
  		database: connect[3]
	});

	con.connect(function(err) {
  		if (err) throw err;
  		var sql = `DELETE FROM ${self['from']} WHERE ${self['where']} = '${self['delete']}'`;
  		con.query(sql, function (err, result) {
    		if (err) throw err;
    		console.log("Number of records deleted: " + result.affectedRows);
  		});
	});
}

function drop(type, connect, self){
	if(type == "table"){
		var con = mysql.createConnection({
  			host: connect[0],
  			user: connect[1],
  			password: connect[2],
  			database: connect[3]
		});

		con.connect(function(err) {
  			if (err) throw err;
  			var sql = `DROP TABLE ${self['drop']}`;
  			con.query(sql, function (err, result) {
    			if (err) throw err;
    			console.log("Table deleted");
  			});
		});
	}
}

functon update(connect, self){
	var con = mysql.createConnection({
  		host: connect[0],
  		user: connect[1],
  		password: connect[2],
  		database: connect[3]
	});

	con.connect(function(err) {
  		if (err) throw err;
  		var sql = `UPDATE ${self['update']} SET ${self['set']} = '${self['setval']}' WHERE ${self['where']} = '${self['whereval']}'`;
  		con.query(sql, function (err, result) {
    		if (err) throw err;
    		console.log(result.affectedRows + " record(s) updated");
  		});
	});
}

function limit(connect, self){
	var con = mysql.createConnection({
  		host: connect[0],
  		user: connect[1],
  		password: connect[2],
  		database: connect[3]
	});

	con.connect(function(err) {
  		if (err) throw err;
  		var sql = `SELECT ${self['select']} FROM ${self['from']} LIMIT ${self['limit']}`;
  		con.query(sql, function (err, result) {
    		if (err) throw err;
    		console.log(result);
  		});
	});
}

function join(connect, self) {
	var con = mysql.createConnection({
  		host: connect[0],
  		user: connect[1],
  		password: connect[2],
  		database: connect[3]
	});

	con.connect(function(err) {
  		if (err) throw err;
  		var sql = `SELECT ${self['select']} AS ${self['as']}, ${self['asname']} AS ${self['asval']} FROM ${self['from']} JOIN ${self['join']} ON ${self['on']}`;
  		con.query(sql, function (err, result) {
    		if (err) throw err;
    		console.log(result);
  		});
	});
}

module.exports = {
	route,
	static,
	setFile,
	JSON,
	raw,
	port,
	create,
	insert,
	select,
	where,
	order,
	del,
	drop,
	update,
	join,
	limit
}
