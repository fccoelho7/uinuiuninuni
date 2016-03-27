var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	username: { type: String, unique: true },
	password: String,
	email: String,
	board: String,
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	updated: { type: Date, default: Date.now },
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	google: {
		id: String,
		token: String,
		name: String,
		email: String
	},
	twitter: {
		id: String,
		token: String,
		username: String,
		displayName: String
	}
});
