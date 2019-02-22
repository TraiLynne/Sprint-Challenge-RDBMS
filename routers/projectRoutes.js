const express = require('express');

const router = express.Router();

router.use(express.json());

// Routes

router.use('/', (req, res) => res.send('Welcome to the Project API'));

module.exports = router;