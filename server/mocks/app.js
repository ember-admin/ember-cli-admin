var Chance = require('chance');
var chance = new Chance();

module.exports = function(app) {
  var express = require('express');
  var appRouter = express.Router();
  users = [];
  avatars = [];
  for (i = 0; i < 50; i++) {
    avatars.push({id: i, thumb_url: 'http://media-cache-ak0.pinimg.com/236x/0c/e6/7f/0ce67fa7c94da77ab90877e65f3fda87.jpg', url: 'http://www.londra.us/Bristol_Castle.jpg'});
    users.push({id: i, name: 'testuser'+i, lat: 50, long: 40, zoom: 3, avatar_id: i, birthdate: new Date()});
  }
  users[0].email = 'test@example.com';
  appRouter.get('/users', function(req, res) {
    if (req.query.q) {
      return res.send({users: [users[0]], meta:{total: 1}, avatars: [avatars[0]]});
    }
    var perPage = +req.query.perPage;
    var page = +req.query.page;
    usersArray = users.slice((page-1)*perPage, page*perPage);
    if (req.query.sort) {
      usersArray.sort(function(prev,next) {
        if (prev[req.query.sort] < next[req.query.sort]) {
          return -1
        } else if (prev[req.query.sort] == next[req.query.sort]) {
          return 0
        } else {
          return 1
        }
      });
      if (!JSON.parse(req.query.orderAscending)) {
        usersArray.reverse();
      }
    }
    avatarsArray = avatars.slice((page-1)*perPage, page*perPage);
    res.send({users: usersArray, meta:{total: 50}, avatars: avatarsArray});
  });

  appRouter.get('/users/autocomplete', function(req, res){
    res.send(users);
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


  var user_category = {id: 1, name: 'test', expired_at: new Date(), zip_code: '123456', description: chance.paragraph({sentences: 10}), is_created: true, email: 'foo@bar.com', color: '#AFAFAF' };
  appRouter.get('/user_categories', function(req, res) {
    res.send({user_categories: [user_category]});
  });
  appRouter.delete('/user_categories/:id', function(req, res) {
    res.send({});
  });

  appRouter.get('/user_categories/:id', function(req, res) {
    res.send({user_category: user_category});
  });

  appRouter.put('/user_categories/:id', function(req, res) {
    res.send({user_category: {id: req.params.id, name: req.body.user_category.name, expired_at: req.body.user_category.expired_at, zip_code: req.body.user_category.zip_code, description: req.body.user_category.description, is_created: req.body.user_category.is_created, email: req.body.user_category.email, color: req.body.user_category.color}});
  });

  appRouter.get('/catalogues', function(req, res){
    var catalogues = [{id: 1, name: 'Tree #1', parent_id: null, catalogue_ids: [2,3]},
      {id: 2, name: 'Tree #2', parent_id: 1, catalogue_ids: [4]},
      {id: 3, name: 'Tree #3', parent_id: 1, catalogue_ids: [5]},
      {id: 4, name: 'Tree #4', parent_id: 2, catalogue_ids: []},
      {id: 5, name: 'Tree #5', parent_id: 3, catalogue_ids: []}
    ];
    res.send({catalogues: catalogues});
  });


appRouter.post('/catalogues', function(req, res){
  res.send({});
});

  appRouter.post('/avatars', function(req, res) {
//    req.on('data', function(chunk){ console.log(chunk)});
    res.send({avatar: {id: 1, thumb_url: 'http://media-cache-ak0.pinimg.com/236x/0c/e6/7f/0ce67fa7c94da77ab90877e65f3fda87.jpg', url: 'http://www.londra.us/Bristol_Castle.jpg'}});
  });

  app.use('/api', appRouter);
};
