module.exports = function(app) {
  var express = require('express');
  var appRouter = express.Router();
  users = [];
  for (i = 0; i < 25; i++) {
    users.push({id: i, name: 'testuser', lat: 50, long: 40, zoom: 3})
  }
  appRouter.get('/users', function(req, res) {
    res.send({users: users, meta:{total: 40}});
  });

  appRouter.delete('/users/:id', function(req, res) {
    res.send({});
  });

  appRouter.get('/users/:id', function(req, res) {
    res.send({user: {id: req.params.id, name: 'testuser', lat: 50, long: 40, zoom: 3}});
  });


  appRouter.put('/users/:id', function(req, res) {
    res.send({user: {id: req.params.id, name: req.body.user.name, lat: req.body.user.lat, long: req.body.user.long, zoom: req.body.user.zoom}});
  });
  app.use('/api', appRouter);
};
