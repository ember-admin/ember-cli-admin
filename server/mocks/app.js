module.exports = function(app) {
  var express = require('express');
  var appRouter = express.Router();
  users = [];
  for (i = 0; i < 25; i++) {
    users.push({id: i, name: 'testuser', lat: 50, long: 40, zoom: 1})
  }
  appRouter.get('/users', function(req, res) {
    res.send({users: users, meta:{total: 40}});
  });

  appRouter.delete('/users/:id', function(req, res) {
    res.send({});
  });
  app.use('/api', appRouter);
};
