const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');
const fs = require('fs');
const path = require('path');

const env = require('./config/environment');
const HttpStatusCodes = require('./common/util/HttpStatusCodes');

const { NotFoundException } = require('./common/exceptions');

const disabilityRouter = require('./routers/disabilityRouter');
const placeRouter = require('./routers/placeRouter');
const userRouter = require('./routers/userRouter');

const HTTP_LOGGING_FILENAME = 'requests.log';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: false }));

app.use(
  logger(
    `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms`,
    {
      stream: fs.createWriteStream(
        path.resolve('logs', HTTP_LOGGING_FILENAME),
        {
          flags: 'a'
        }
      )
    }
  )
);
app.use(logger('dev'));

//routes
app.use('/api/disabilities', disabilityRouter);
app.use('/api/places', placeRouter);
app.use('/api/users', userRouter);

app.route('*').all((req, res) => {
  res.status(HttpStatusCodes.NOT_FOUND).json(new NotFoundException());
});

const server = http.createServer(app);
server.listen(env.port, () => {
  console.log(`Server running at ${env.address}`);
});
