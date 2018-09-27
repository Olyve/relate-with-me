// Standard HTTP response codes
const statusCodes = {
  200: 'Success',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

// Customized status messages for each HTTP response code
const statusMessages = {
  200: 'Request succeeded.',
  201: 'Resource successfully created.',
  202: 'The request is being processed and may take some time.',
  204: 'There is nothing to return.',
  400: 'Request failed, please try again.',
  401: 'Please check credentials and try again.',
  403: 'Cannot access resource.',
  404: 'Nothing to see here ¯\_(ツ)_/¯.', // eslint-disable-line no-useless-escape
  500: 'Something has gone wrong. Please try again.',
};

// Takes an Express response object and any data that may be needed for the client.
// The function returns the result of turning the payload into json and returning it
// to the client.
function clientResponse(res, code, messages, data) {
  const payload = {
    status: statusCodes[code],
    messages: messages || [statusMessages[code]],
  };

  if (data) {
    payload.data = data;
  }

  return res.status(code).json(payload);
}

module.exports = { clientResponse };
