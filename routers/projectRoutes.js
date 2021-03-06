const express = require('express');

const router = express.Router();
const db = require('../db/helpers/projectModel');

router.use(express.json());

// Routes
// C - Create
router.post('/', async (req, res) => {
    const newRecord = req.body;

    try {
        if(!newRecord.name || newRecord.name === '') {
            res
                .status(400)
                .json({
                    errorMessage: 'Please provide a name for the new record'
                });
        } else if (!newRecord.description || newRecord.description === ''){
            res
                .status(400)
                .json({
                    errorMessage: 'Please provide a description for the new record'
                });
        } else if (!newRecord.completed) {
            newRecord.completed = false;

            const newProject = await db.createProject(newRecord);

            newProject ?
                res
                    .status(201)
                    .json(newProject[0])
                :
                res
                    .status(500)
                    .json({
                        errorMessage: 'There was an error processing your request'
                    });
        } else {
            const newProject = await db.createProject(newRecord);

            newProject ?
                res
                .status(201)
                .json(newProject[0]) :
                res
                .status(500)
                .json({
                    errorMessage: 'There was an error processing your request'
                });
        }
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem'
            });
    }
});

// R - Read
router.get('/', async (req, res) => {

    try {
        const projects = await db.readProjects();

        projects.length > 0 ?
            res
                .status(200)
                .json(projects)
            :
            res
                .status(404)
                .json({
                    errorMessage: 'No Projects located at this time'
                });
    } catch (err) {
        res
            .status(500)
            .json('Houston, we have a problem');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const project = await db.readProject(id);

        if (project) {
            project.actions = await db.readProjectActions(id);

            res
                .status(200)
                .json(project)
        } else {
            res
                .status(404)
                .json({
                    errorMessage: 'There was no Project found'
                })
        }
    } catch (err) {
        res
            .status(500)
            .json('Houston, we have a problem');
    }
});

router.get('/:id/actions', async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const actions = await db.readProjectActions(id);

        actions.length > 0 ?
            res
                .status(200)
                .json(actions)
            :
            res
                .status(404)
                .json({
                    errorMessage: 'There were no actions found'
                })
    } catch (err) {
        res
            .status(500)
            .json('Houston, we have a problem');
    }
});

// U - Update
router.put('/:id', async (req, res) => {
    const {
        id
    } = req.params
    const updatedRecord = req.body;

    try {
        const updates = await db.updateProject(id, updatedRecord);
        res
            .status(200)
            .json({updates})
    } catch (err) {
        res
            .status(500)
            .json('Houston, we have a problem');
    }
});

// D - Destroy
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedActions = await db.destroyProjectActions(id);
        const deletedProjects = await db.destroyProject(id);

        res
            .status(200)
            .json({
                deletedProjects,
                deletedActions
            })
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem'
            });
    }
});

router.use('/', (req, res) => res.send('Welcome to the Project API'));

module.exports = router;