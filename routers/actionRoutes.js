const express = require('express');

const router = express.Router();
const db = require('../data/helpers/actionModel');
const projectDb = require('../data/helpers/projectModel');

router.use(express.json());

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
            projectRecord = await projectDb.findById(newRecord.project_id);

            if (!projectRecord) {
                res
                    .status(400)
                    .json({
                        errorMessage: 'Please provide an existing project this action will be attached to.'
                    });
            } else {
                newRecord.completed = false;

                const newId = await db.create(newRecord);

                newId ?
                    res
                        .status(200)
                        .json({
                            newId: newId[0]
                        })
                    :
                    res
                        .status(500)
                        .json({
                            errorMessage: 'There was an error processing a request. Please try again'
                        });
            }
        } else {
            projectRecord = await projectDb.findById(newRecord.project_id);

            if (!projectRecord) {
                res
                    .status(400)
                    .json({
                        errorMessage: 'Please provide an existing project this action will be attached to.'
                    });
            } else {
                const newId = await db.create(newRecord);

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
// All
router.get('/', async (req, res) => {
    try {
        const actions = await db.readAll();

        actions.length > 0 ?
            res
            .status(200)
            .json(actions) :
            res
            .status(404)
            .json({
                errorMessage: 'There are no actions found at this time. Please create one and try again'
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
router.get('/:id', (req, res) => {
    res
        .status(200)
        .json({
            url: '/api/actions/:id',
            operation: 'GET'
        });
});

// U - Update
router.put('/:id', (req, res) => {
    res
        .status(200)
        .json({
            url: '/api/actions/:id',
            operation: 'PUT'
        });
});

// D - Destory
router.delete('/:id', (req, res) => {
    res
        .status(200)
        .json({
            url: '/api/actions/:id',
            operation: 'DELETE'
        });
});

router.use('/', (req, res) => res.send('Welcome to the Action API'));

module.exports = router;