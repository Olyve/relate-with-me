const { Router } = require('express');

const router = Router();

// Root route
router.get('/', (req, res) => {
  res.status(200)
    .json({
      status: 'Success',
      message: 'You have pinged the api, congrats',
    });
});

module.exports = router;
