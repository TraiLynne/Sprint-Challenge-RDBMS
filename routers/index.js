const express = require('express');

const router = express.Router();

// Sub-Routers
const projectRouter = require('./projectRoutes');
const actionRouter = require('./actionRoutes');

router.use(express.json());

// Routes
router.use('/projects', projectRouter);
router.use('/actions', actionRouter);

router.use('/', (req, res) => res.send('Welcome to the Main API'));

module.exports = router;