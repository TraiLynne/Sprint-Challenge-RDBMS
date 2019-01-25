const express = require('express');

const router = express.Router();

// Sub-Routers


router.use('/', (req, res) => res.send('Welcome to the main API!!'));

// Export
module.exports = router;