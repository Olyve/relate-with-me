import app from './src/app';
import logger from './src/utils/logger';

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  logger.info(`Relate-With-Me is runing in ${process.env.NODE_ENV} mode on port ${PORT}.`)
});
