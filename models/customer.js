var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');




function genAcctNum() {
	const seed = Math.floor(Math.random() * 10000000000);
	return '' + seed;
}

const customerSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	dateOfBirth: {type: Date},
	city: {type: String},
	state: {type: String},
	country: {type: String},
	email: {type: String, unique: true, required: true, maxLength: 255},
	hasVerifiedEmail: {type: Boolean, default: false},
	dateJoined: {type: Date, default: Date.now},
	accountNumber: {
		type: String,
		minLength: 8,
		maxLength: 15,
		required: true,
		unique: true,
		default: genAcctNum,
	},
	balance: {type: Number, min: 0, default: 0},
	totalCredit: {type: Number, min: 0, default: 0},
	totalDebit: {type: Number, min: 0, default: 0},

	lastLogin: {
		type: Date,
		default: Date.now,
	},
});

customerSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
	lastLoginField: 'lastLogin',
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
