const app = require('./app');
const logger = require('./utils/logger');
const { openConnection } = require('./utils/database');
require('dotenv').config();

const PORT = process.env.PORT || 3030;

openConnection()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Relate-With-Me is runing in ${process.env.NODE_ENV} mode on port ${PORT}.`);
    });
  })
  .catch(err => logger.error(err));
