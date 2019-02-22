const knex = require('knex');

const dbConfig('../../knexfile.js');
const db = knex(dbConfig.development);
const dbName = 'actions';

// C - Create
const createAction = newAction => db(dbName).insert(newAction);

// R - Read
const readActions = () => db(dbName);

const readAction = id => db(dbName).where({
    id
}).first();


// U - Update
const updateAction = (id, updatedAction) => db(dbName).where({
    id
}).update(updatedAction);

// D - Destory
const destroyAction = id => db(dbName).where({
    id
}).del();


module.exports = {
    createAction,
    readActions,
    readAction,
    updateAction,
    destroyAction
}