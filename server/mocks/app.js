module.exports = function(app) {
  var express = require('express');
  var appRouter = express.Router();
  users = [];
  for (i = 0; i < 25; i++) {
    users.push({id: i, name: 'testuser'})
  }
  appRouter.get('/users', function(req, res) {
    res.send({users: users, meta:{total: 40}});
  });
  app.use('/api', appRouter);
};
