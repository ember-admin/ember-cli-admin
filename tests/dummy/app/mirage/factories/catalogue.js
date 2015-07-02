import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: function(i) {
    i = i + 1;
    return "Tree #" + i;
  },
  parent_id: function(i) {
    i = i + 1;
    let pId = i - 1;
    if (pId < 1) {
      pId = null;
    }
    return pId;
  },
  catalogue_ids: function(i) {
    i = i + 1;
    if (i === 4 || i === 5) {
      return [];
    } else if (i === 1) {
      return [2, 3];
    } else {
      return [i + 2];
    }
  }
});
