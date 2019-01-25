const express = require('express');

const router = express.Router();

const projectRoutes = require('./projectRoutes');
const actionRoutes = require('./actionRoutes');

// Sub-Routers
router.use('/projects', projectRoutes);
router.use('/actions', actionRoutes);

router.use('/', (req, res) => res.send('Welcome to the main API!!'));

// Export
module.exports = router;