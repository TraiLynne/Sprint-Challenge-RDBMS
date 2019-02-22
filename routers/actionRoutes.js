const express = require('express');

const router = express.Router();
const db = require('../db/helpers/actionModel');
const projectDb = require('../db/helpers/projectModel')

router.use(express.json());

// Routes
// C - Create
router.post('/', async (req, res) => {
    let projectRecord = null;

    const newRecord = req.body;

    try {
        if (!newRecord.description || newRecord.description === '') {
            res
                .status(400)
                .json({
                    errorMessage: 'Please provide a description for this new record'
                });
        } else if (!newRecord.notes || newRecord.notes === '') {
            res
                .status(400)
                .json({
                    errorMessage: 'Please provide notes for this new record'
                });
        } else if (!newRecord.project_id) {
            res
                .status(400)
                .json({
                    errorMessage: 'Please provide an existing project this action will be attached to.'
                });
        } else if (!newRecord.completed) {
            projectRecord = await projectDb.readProject(newRecord.project_id);

            if (!projectRecord) {
                res
                    .status(400)
                    .json({
                        errorMessage: 'Please provide an existing project this action will be attached to.'
                    });
            } else {
                newRecord.completed = false;

                const newId = await db.createAction(newRecord);

                newId ?
                    res
                    .status(200)
                    .json({
                        newId: newId[0]
                    }) :
                    res
                    .status(500)
                    .json({
                        errorMessage: 'There was an error processing a request. Please try again'
                    });
            }
        } else {
            projectRecord = await projectDb.readProject(newRecord.project_id);

            if (!projectRecord) {
                res
                    .status(400)
                    .json({
                        errorMessage: 'Please provide an existing project this action will be attached to.'
                    });
            } else {
                const newId = await db.createAction(newRecord);

                newId ?
                    res
                    .status(200)
                    .json({
                        newId: newId[0]
                    }) :
                    res
                    .status(500)
                    .json({
                        errorMessage: 'There was an error processing a request. Please try again'
                    });
            }
        }
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem.'
            });
    }
});

// R - Read
router.get('/', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'GET',
            url: '/api/actions/'
        });
});

router.get('/:id', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'GET',
            url: '/api/actions/:id'
        });
});

// U - Update
router.put('/:id', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'PUT',
            url: '/api/actions/:id'
        });
});

// D - Destroy
router.delete('/:id', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'DELETE',
            url: '/api/actions/:id'
        });
});

router.use('/', (req, res) => res.send('Welcome to the Action API'));

module.exports = router;