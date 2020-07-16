var express = require('express');
var app = express();

var request = require('request');
var ejs = require('ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res) =>{
	res.render('home.ejs');
});

app.get('/movie/',(req,res)=>{
	var search = req.query.title;
	request('http://www.omdbapi.com/?s='+search+'&apikey=thewdb',(error,response,body)=>{
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render('results.ejs',{search:search, data:data });

		}
	});
});


var server = app.listen(3000,() => {
	console.log('Server is running');
});