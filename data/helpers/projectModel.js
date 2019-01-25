const knex = require('knex');

const dbConfig = require('../../knexfile');
const db = knex(dbConfig.development);

// C - Create 
const create = newRecord => db('projects').insert(newRecord);

// R - Read
// All
const readAll = () => db('projects');

// Unique
const findById = id => db('projects').where({
    id
}).first();

// Unique Actions
const findProjectActions = id => db('actions').where({
    project_id: id
});

// U - Update
const update = (id, record) => db('projects').where({
    id
}).update(record);

// D - Destroy
const destroy = id => db('projects').where({
    id
}).del();

module.exports = {
    create,
    readAll,
    findById,
    findProjectActions,
    update,
    destroy
};