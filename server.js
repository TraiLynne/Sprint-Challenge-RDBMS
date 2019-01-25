// Imports
const express = require('express');
const helmet = require('helmet');

const server = express();
const port = 4000;

const mainRouter = require('./routers')

server.use(helmet());

// Endpoints
server.use('/api', mainRouter);

// Catch
server.use('/', (req, res) => res.send('It\'s working !! \nIt\'s working !!'));

// Listerner
server.listen(port, () => console.log(`Server running on port ${port}`));