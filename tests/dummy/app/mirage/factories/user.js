import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: faker.name.findName(),
  lat: faker.address.latitude(),
  long: faker.address.longitude(),
  email: faker.internet.email(),
  zoom: 3,
  birthdate: faker.date.past(),
  avatar_id: function(i) {
    return i + 1;
  }
});
