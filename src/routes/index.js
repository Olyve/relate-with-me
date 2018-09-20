const { Router } = require('express');

const router = Router();

// Root route
router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome!' });
});

module.exports = router;
