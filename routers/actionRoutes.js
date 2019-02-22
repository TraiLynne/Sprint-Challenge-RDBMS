const express = require('express');

const router = express.Router();

router.use(express.json());

// Routes

router.use('/', (req, res) => res.send('Welcome to the Action API'));

module.exports = router;