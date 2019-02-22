
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {
          description: 'define DB',
          notes: 'Use Knex Migrations',
          completed: false,
          project_id: 1
        },
        {
          description: 'define Server and Routes',
          notes: 'Use Express',
          completed: false,
          project_id: 1
        },
        {
          description: 'Submit PR',
          notes: 'Make sure to request Review from Alex',
          completed: false,
          project_id: 1
        },
        {
          description: 'Get Gas',
          notes: 'Mama requested Racetrac',
          completed: false,
          project_id: 2
        },
        {
          description: 'Make a Bottle',
          notes: '7oz, 3 scoops, 30 seconds, & shake',
          completed: false,
          project_id: 3
        },
        {
          description: 'Find the BoBo',
          notes: 'Red with Rocky & Blue that glows in the dark',
          completed: false,
          project_id: 3
        },
        {
          description: 'Sing a Lullaby',
          notes: 'Songs: You\'ll be in My Heart from Tarzan and Itsy Bitsy Spider',
          completed: false,
          project_id: 3
        },
      ]);
    });
};
