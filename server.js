const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('yearhelper',()=>{
	return new Date().getFullYear();
})

hbs.registerHelper('yeller',(text)=>{
	return text.toUpperCase();
});

app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
	var now = new Date().toString();

	var displayString = `${now} -- ${req.url} -- ${req.method}`;

	fs.appendFile('serverlog.txt',displayString + "\n",(error)=>{
		if(error){
			console.log("errormen: "+error);
		}
	});
	console.log(now + " -- " + req.url + " -- "+ req.method);
	next();
});

app.use((req,res,next)=>{
	res.render('maintainence.hbs');
})

app.get('/about',(req,res)=>{

	res.render('about.hbs',{
		name:'Yusb00ss'
	});
});


app.get('/bad',(req,res)=>{
	res.send({
		code: 3582,
		message: "Ya dun goofed"
	})
});

app.get('/',(req,res)=>{

	date = new Date().getFullYear();

	res.render('home.hbs',{
		name:'Home',
		currentYear:date,
		welcomeMsg: 'Welcome home you '+date+' boiii!'
	});
})

app.listen(port,()=>{
	console.log("we in bizniz");
});