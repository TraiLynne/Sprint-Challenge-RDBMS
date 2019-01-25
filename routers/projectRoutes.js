const express = require('express');

const router = express.Router();

router.use(express.json());

// C - Create
router.post('/', (req, res) => {
    res
        .status(201)
        .json({
            url: '/api/projects/',
            operation: 'POST'
        });
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