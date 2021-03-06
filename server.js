const express = require('express');
const helmet = require('helmet');

const server = express();
const port = 4000;
const mainRouter = require('./routers');

server.use(helmet());

server.use('/api', mainRouter);

server.use('/', (req, res) => res.send('It\'s Working !!\nIt\'s Working !!'));

server.listen(port, () => console.log(`Server Listening on Port ${port}`));
