const knex = require('knex');

const dbConfig = require('../../knexfile');
const db = knex(dbConfig.development);

// C - Create 
const create = newRecord => db('actions').insert(newRecord);

// R - Read
// All
const readAll = () => db('actions');

// Unique
const findById = id => db('actions').where({
    id
}).first();

// U - Update
const update = (id, record) => db('actions').where({
    id
}).update(record);

// D - Destroy
const destroy = id => db('actions').where({
    id
}).del();

module.exports = {
    create,
    readAll,
    findById,
    update,
    destroy
};