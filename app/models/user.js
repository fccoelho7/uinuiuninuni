var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	username: { type: String, unique: true },
	password: { type: String },
	email: { type: String },
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	updated: { type: Date, default: Date.now },
	facebook: {
		id: { type: String },
		token: { type: String },
		email: { type: String },
		name: { type: String }
	},
	google: {
		id: { type: String },
		token: { type: String },
		name: { type: String },
		email: { type: String }
	},
	twitter: {
		id: { type: String },
		token: { type: String },
		username: { type: String },
		displayName: { type: String }
	}
});
