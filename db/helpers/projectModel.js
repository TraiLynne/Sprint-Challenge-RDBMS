const knex = require('knex');

const dbConfig = require('../../knexfile.js');
const db = knex(dbConfig.development);
const dbName = 'projects';

// C - Create
const createProject = newProject => db(dbName).insert(newProject);

// R - Read
const readProjects = () => db(dbName);

const readProject = id => db(dbName).where({ id }).first();

const readProjectActions = id => db('actions').where({ project_id: id});

// U - Update
const updateProject = (id, updatedProject) => db(dbName).where({ id }).update(updatedProject);

// D - Destory
const destroyProject = id => db(dbName).where({id}).del();

const destroyProjectActions = id => db('actions').where({ project_id: id}).del();


module.exports = {
    createProject,
    readProjects,
    readProject,
    readProjectActions,
    updateProject,
    destroyProject,
    destroyProjectActions
}