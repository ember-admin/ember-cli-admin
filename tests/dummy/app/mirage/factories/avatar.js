import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  url: faker.image.avatar,
  position: faker.list.random(1,2,3),
  thumb_url: faker.image.avatar,
});
