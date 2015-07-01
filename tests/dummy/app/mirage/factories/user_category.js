import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: faker.company.bsNoun(),
  zip_code: '123456',
  email: faker.internet.email(),
  is_created: true,
  expired_at: faker.date.past(),
  color: faker.internet.color(),
  description: faker.lorem.sentences(10),
  avatar_ids: function() {
    return [1, 2];
  },
});
