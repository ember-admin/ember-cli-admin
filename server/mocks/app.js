module.exports = function(app) {
  var express = require('express');
  var appRouter = express.Router();
  users = [];
  avatars = [];
  for (i = 0; i < 50; i++) {
    avatars.push({id: i, thumb_url: 'http://media-cache-ak0.pinimg.com/236x/0c/e6/7f/0ce67fa7c94da77ab90877e65f3fda87.jpg', url: 'http://www.londra.us/Bristol_Castle.jpg'});
    users.push({id: i, name: 'testuser', lat: 50, long: 40, zoom: 3, avatar_id: i});
  }
  appRouter.get('/users', function(req, res) {
    var perPage = +req.query.perPage;
    var page = +req.query.page;
    usersArray = users.slice((page-1)*perPage, page*perPage);
    avatarsArray = avatars.slice((page-1)*perPage, page*perPage);
    res.send({users: usersArray, meta:{total: 50}, avatars: avatarsArray});
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



  appRouter.get('/user_categories', function(req, res) {
    res.send({user_categories: [{id: 1, name: 'test'}]});
  });
  appRouter.delete('/user_categories/:id', function(req, res) {
    res.send({});
  });

  appRouter.get('/user_categories/:id', function(req, res) {
    res.send({user_category: {id: req.params.id, name: 'test'}});
  });

  appRouter.put('/user_categories/:id', function(req, res) {
    res.send({user_category: {id: req.params.id, name: req.body.user_category.name}});
  });




  appRouter.post('/avatars', function(req, res) {
//    req.on('data', function(chunk){ console.log(chunk)});
    res.send({avatar: {id: 1, thumb_url: 'http://media-cache-ak0.pinimg.com/236x/0c/e6/7f/0ce67fa7c94da77ab90877e65f3fda87.jpg', url: 'http://www.londra.us/Bristol_Castle.jpg'}});
  });

  app.use('/api', appRouter);
};
