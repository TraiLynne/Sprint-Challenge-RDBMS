
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          name: 'Complete Sprint',
          description: 'Complete the Sprint Challenge for Today',
          completed: false
        }, {
          name: 'Take Mom to Work',
          description: '45 minutes each way',
          completed: false
        }, {
          name: 'Babysit JaLeal',
          description: 'This Boy is a Handful I tell you',
          completed: false
        }
      ]);
    });
};
