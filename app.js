const express = require('express')
const app = express()
const session = require('express-session')
const pug = require('pug')
app.set('view engine', 'pug')
app.use(express.json())
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 18000000 } }))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


//Session opsætning
function checkAuth(req, res, next) {
	let side = req.url.toLowerCase();
	
	if (side === '/admin' && (!req.session || !req.session.authenticated)) {
		res.render('login', { status: 403 });
		return;
	}
	if (side == '/adminsortiment' && (!req.session || !req.session.authenticated)) {
		res.render('login', { status: 403 });
		return;
	}

	next();
}

app.use(checkAuth);


//mongodb opsætning
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://dbNissen:bajer123@mundhaeld-nshjk.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true,
	autoIndex: false,
	useUnifiedTopology: true
}).catch(error => handleError(error));

// Routes
const adminRouter = require('./routes/admin.js')
app.use('', adminRouter)

const loginRouter = require('./routes/login.js')
app.use('', loginRouter)

const bookingRouter = require('./routes/booking.js')
app.use('', bookingRouter)

const sortimentRouter = require('./routes/sortiment.js')
app.use('', sortimentRouter)

const forsideRouter = require('./routes/forside')
app.use('', forsideRouter)
app.use(express.static('public'))

app.listen(8000)
console.log('Lytter på port 8000')