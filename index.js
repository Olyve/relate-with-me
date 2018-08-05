import app from './src/app';
import logger from './src/utils/logger';
import { open as openConnection } from './src/utils/database';

const PORT = process.env.PORT || 3030;

openConnection().then(() => {
  app.listen(PORT, () => {
    logger.info(`Relate-With-Me is runing in ${process.env.NODE_ENV} mode on port ${PORT}.`);
  });
}).catch(err => logger.error(err));
