module.exports = function(app) {
  var express = require('express');
  var appRouter = express.Router();
  appRouter.get('/users', function(req, res) {
    res.send({users:[{id: 1, name: 'testuser'}],meta:{total: 2}});
  });
  app.use('/api', appRouter);
};
