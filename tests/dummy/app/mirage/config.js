import Mirage from 'ember-cli-mirage';

export default function() {
  this.namespace = 'api';

  this.get('/users', function(db, req) {
    let users = db.users;
    let avatars = db.avatars;
    if (req.queryParams.q) {
      return {
        users: [users[0]],
        meta: {
          total: 1
        },
        avatars: [avatars[0]]
      }
    }
    var perPage = +req.queryParams.perPage;
    var page = +req.queryParams.page;
    let usersArray = users.slice((page - 1) * perPage, page * perPage);
    if (req.queryParams.sort) {
      let sort = req.queryParams.sort;
      usersArray.sort(function(prev, next) {
        if (prev[sort] < next[sort]) {
          return -1;
        } else if (prev[sort] == next[sort]) {
          return 0;
        } else {
          return 1;
        }
      });
      if (!JSON.parse(req.queryParams.orderAscending)) {
        usersArray.reverse();
      }
    }
    let avatarsArray = avatars.slice((page - 1) * perPage, page * perPage);
    return {
      users: usersArray,
      meta: {
        total: 50
      },
      avatars: avatarsArray
    };
  });

  this.get('/users/autocomplete', 'users');

  this.del('/users/:id', 'user')
  this.get('/users/:id', function(db, req) {
    let user = db.users.find(req.params.id);
    let avatar = db.avatars.find(req.params.id);
    return {user: user, avatars: [avatar]};
  });
  this.put('/users/:id', 'user');
  this.post('/users', 'user');

  this.get('/user_categories', ['user_categories', 'avatars']);
  this.post('/user_categories', function(db, req) {
    var errors = {};
    let user_categories = db.user_categories;
    let avatars = db.avatars;
    if (JSON.parse(req.requestBody).user_category.email === null) {
      errors.email = ["can't be blank"];
      return new Mirage.Response(422, null, errors);
    } else {
      return {
        user_categories: user_categories,
        avatars: avatars
      };
    }
  });
  this.get('/user_categories/:id', ['user_category', 'avatar']);
  this.del('/user_categories/:id', 'user_category');
  this.put('/user_categories/:id', 'user_category');

  this.get('/cars', 'cars'); 
  this.del('/cars/:id', 'car');
  this.get('/cars/:id', 'car');
  this.put('/cars/:id', 'car');
  this.post('/cars', 'car');

  this.get('/catalogues', 'catalogues');
  this.post('/catalogues', 'catalogue');

  this.put('/avatars/:id', 'avatar');
  this.post('/avatars', 'avatar');

}
