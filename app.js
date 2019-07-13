const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

dotenv.config();

const {
	DB_user, DB_clientId, DB_clientSecret, DB_refreshToken
} = process.env;

console.log(`chodie test ${DB_user}`);
const app = express();

let port = process.env.PORT || 8080;

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', { layout: false });
});

app.get('/services', (req, res) => {
  res.render('services', { layout: false });
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio', { layout: false });
});

app.get('/contact', (req, res) => {
  res.render('contact', { layout: false });
});

app.get('/6411', (req, res) => {
  res.render('6411', { layout: false });
});

app.get('/5965', (req, res) => {
  res.render('5965', { layout: false });
});

app.get('/9179', (req, res) => {
  res.render('9179', { layout: false });
});

app.get('/soundwall', (req, res) => {
  res.render('soundwall', { layout: false });
});

app.get('/memorial', (req, res) => {
  res.render('memorial', { layout: false });
});

app.get('/quailrun', (req, res) => {
  res.render('quailrun', { layout: false });
});


app.post('/send', (req, res) => {
	const output = `
		<p>You have a new contact request</p>
		<h3>Contact Details</h3>
		<ul>
			<li>Name: ${req.body.name}</li>
			<li>Email: ${req.body.email}</li>
		</ul>
		<h3>Message</h3>
		<p>${req.body.message}</p>
	`;

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: "OAuth2",
			user: DB_user,
			clientId: DB_clientId,
			clientSecret: DB_clientSecret,
			refreshToken: DB_refreshToken
		}
	});

  // send mail with defined transport object
  let mailOptions = {
    from: '', // sender address
    to: "r.muslimani@gmail.com, raymus@comcast.net", // list of receivers
    subject: "NR Contact Request", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  };
	
	transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			return console.log(error);
		}
		console.log('Message Sent: %s', info.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		transporter.close();

	});
          res.render('index', {layout: false});	
});

app.listen(port, () => console.log('Server is starting now....' + port));

//{msg: 'Your Contact Request has been sent!'}