require('dotenv').load();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;
const ENV = process.env.NODE_ENV || 'development';

const db = {}; /* Will need to require('./db') if you want to do the API & Database feature. */

['projects', 'sites', 'trees'].forEach(router => {
  app.use(`/api/${router}`, require(`./routes/${router}`)(db));
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}, in ${ENV} mode.`));
