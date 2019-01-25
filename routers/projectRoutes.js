const express = require('express');

const router = express.Router();
const db = require('../data/helpers/projectModel');

router.use(express.json());

// C - Create
router.post('/', async (req, res) => {
    const newRecord = req.body;
    try {
        if (!newRecord.name || newRecord.name === '') {
            res
                .status(400)
                .json({
                    errorMessage: 'Please provide a name for the new record'
                });
        } else if (!newRecord.description || newRecord.description === '') {
            res
                .status(400)
                .json({
                    errorMessage: 'Please provide a description for the new record'
                });
        } else if (!newRecord.completed) {
            newRecord.completed = false;

            const newId = await db.create(newRecord);

            newId ?
                res
                    .status(201)
                    .json({
                        newId: newId[0]
                    })
            :
            res
                .status(500)
                .json({
                    errorMessage: 'There was an error processing your request. Please try again'
                });
        } else {
            const newId = await db.create(newRecord);

            newId ?
                res
                .status(201)
                .json({
                    newId: newId[0]
                }) :
                res
                .status(500)
                .json({
                    errorMessage: 'There was an error processing your request. Please try again'
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
// All
router.get('/', async (req, res) => {
    try {
        const projects = await db.readAll();

        projects.length > 0 ?
            res
                .status(200)
                .json(projects)
            :
            res
                .status(404)
                .json({
                    errorMessage: 'There are no projects found at this time. Please create one and try again'
                });
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem'
            });
    }
});

// Unique
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    let project = null;

    try {
        project = await db.findById(id);

        project.actions = await db.findProjectActions(id);

        project ?
            res
                .status(200)
                .json(project)
            :
            res
                .status(404)
                .json({
                    errorMessage: 'No project found'
                });
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem'
            });
    }
});

// U - Update
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const changesMade = await db.update(id, updates);

        res
            .status(200)
            .json({
                changesMade
            });
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem'
            });
    }
});

// D - Destory
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    let record = null;

    try {
        const recordsDeleted = await db.destroy(id);
        record = await db.findById(id);

        if (record) {
            const recordsDeleted = await db.destroy(id);
            res
                .status(200)
                .json({
                    recordsDeleted
                });
        } else {
            res
                .status(404)
                .json({
                    errorMessage: `There is no existing record to delete with the id ${id}`
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

router.use('/', (req, res) => res.send('Welcome to the Project API'));

module.exports = router;