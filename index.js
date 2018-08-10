const app = require('./src/app');
const logger = require('./src/utils/logger');
const { openConnection } = require('./src/utils/database');
require('dotenv').config();

const PORT = process.env.PORT || 3030;

openConnection().then(() => {
  app.listen(PORT, () => {
    logger.info(`Relate-With-Me is runing in ${process.env.NODE_ENV} mode on port ${PORT}.`);
  });
}).catch(err => logger.error(err));
