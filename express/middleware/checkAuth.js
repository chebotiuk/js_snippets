var HttpError = require('error').HttpError;

module.exports = function(req, res, next) {
  if (!req.session.user) {
    next(new HttpError(401, 'You unauthorized, log in first'));
    return;
  }

  next();
}
