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
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    let action = null;

    try {
        action = await db.findById(id);

        action ?
            res
            .status(200)
            .json(action) :
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
    const {
        id
    } = req.params;
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
    const {
        id
    } = req.params;
    let record = null;

    try {
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

router.use('/', (req, res) => res.send('Welcome to the Action API'));

module.exports = router;