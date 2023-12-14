const express = require('express');
const fallback = require('express-history-api-fallback');
const compression = require('compression');

const app = express();

app.use(compression());

app.use(express.static(`${__dirname}/build`));

app.use(fallback(`${__dirname}/build/index.html`));

const port = process.env.PORT || 10000;

app.listen(port);
