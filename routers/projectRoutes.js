const express = require('express');

const router = express.Router();
const db = require('../db/helpers/projectModel');

router.use(express.json());

// Routes
// C - Create
router.post('/', (req, res) => {
    res
        .status(201)
        .json({
            operation: 'POST',
            url: '/api/projects/'
        });
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

router.get('/:id', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'GET',
            url: '/api/projects/:id'
        });
});

router.get('/:id/actions', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'GET',
            url: '/api/projects/:id/actions'
        });
});

// U - Update
router.put('/:id', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'PUT',
            url: '/api/projects/:id'
        });
});

// D - Destroy
router.delete('/:id', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'DELETE',
            url: '/api/projects/:id'
        });
});

router.use('/', (req, res) => res.send('Welcome to the Project API'));

module.exports = router;