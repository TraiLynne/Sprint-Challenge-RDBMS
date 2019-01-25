const express = require('express');

const router = express.Router();
const db = require('../data/helpers/projectModel');

router.use(express.json());

// C - Create
router.post('/', async (req, res) => {
    const newRecord = req.body;
    try {
        if (!newRecord.name || !newRecord.name === '') {
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
router.get('/', (req, res) => {
    res
        .status(200)
        .json({
            url: '/api/projects/',
            operation: 'GET'
        });
});

// Unique
router.get('/:id', (req, res) => {
    res
        .status(200)
        .json({
            url: '/api/projects/:id',
            operation: 'GET'
        });
});

// U - Update
router.put('/:id', (req, res) => {
    res
        .status(200)
        .json({
            url: '/api/projects/:id',
            operation: 'PUT'
        });
});

// D - Destory
router.delete('/:id', (req, res) => {
    res
        .status(200)
        .json({
            url: '/api/projects/:id',
            operation: 'DELETE'
        });
});

router.use('/', (req, res) => res.send('Welcome to the Project API'));

module.exports = router;