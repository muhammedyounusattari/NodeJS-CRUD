var express = require('express');
var app = express();
var db = require('./database-details.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
app.engine('html', require('ejs').renderFile);
app.use(express.static('css'))



//load all data from mysql database on screen
app.get('/',function(request,response){
	
	console.log('inside default url');
	const sql='select *From registration';
	db.con.query(sql,function(error,result,field){
		var data = JSON.stringify(result);
		response.render(__dirname+'/view/home.html',{data:data});
	})
});


app.get('/edit',function(request,response){
	const uname = request.query.username;
	const password = request.query.password;
	const sql='select *From registration where username=? and password=?';

	db.con.query(sql,[uname,password],function(error,result,field){
		var data = JSON.stringify(result);
		response.render(__dirname+'/view/edit.html',{data:data});
	})
})


app.get('/delete',function(request,response){
	const uname = request.query.username;
	const sql ='delete from registration where username=?';

	db.con.query(sql,[uname],function(error,result,field){
		response.redirect('/');
	})
})


app.post('/update',urlencodedParser, function(request,response){
	const uname = request.body.username;
	const email = request.body.email;
	const password = request.body.password;
	const confpassword = request.body.confpassword;


	const sql = 'update registration set email=?, password=?, confpassword=? where username=?';

	db.con.query(sql,[email,password,confpassword,uname],function(error,result,field){

		response.redirect('/');
	})
})

app.get('/register',function(request,response){
	response.sendFile(__dirname+'/view/register.html');
})


app.listen('8181');
