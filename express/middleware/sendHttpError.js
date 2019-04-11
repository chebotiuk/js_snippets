module.exports = function(req, res, next) {
  res.sendHttpError = function(error) {
    res.status(error.status);

    if (req.xhr) { // identify if it's an Ajax request
      res.json(error);
    } else {
      res.render('error', { error });
    }
  };

  next();
}
