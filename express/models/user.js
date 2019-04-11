var path = require('path');
var util = require('util');
var crypto = require('crypto');
var mongoose = require(path.join(__dirname, '../libs/mongoose')),
  Schema = mongoose.Schema; // подключаем модуль Schema

function AuthError(message) {
  this.message = message

  Error.captureStackTrace(this, AuthError);
}
util.inherits(AuthError, Error);
AuthError.prototype.name = 'AuthError';

var schema = new Schema({ // Создаем схему
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._plainPassword;
  });

schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(username, password) {
  var User = this;

  return User.findOne({ username: username })
    .then(user => {
      if (user) {
        if (user.checkPassword(password)) {
          return user;
        } else {
          throw new AuthError('Password incorrect');
        }
      } else {
        var newUser = new User({
          username: username,
          password: password
        });

        return newUser.save();
      }
    })
}

exports.User = mongoose.model('User', schema); // Экспортируем объект для управления бд
exports.AuthError = AuthError;
