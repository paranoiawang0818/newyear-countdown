const express = require('express');
const router = express.Router();
const {
  createWish,
  getMyWishes,
  getAllWishes,
  getPublicWishes,
  updateWishVisibility,
  deleteWish,
} = require('../controllers/wishController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Public route
router.get('/public', getPublicWishes);

// Protected routes
router.post('/', auth, createWish);
router.get('/mine', auth, getMyWishes);
router.delete('/:id', auth, deleteWish);

// Admin routes
router.get('/all', admin, getAllWishes);
router.patch('/:id/visibility', admin, updateWishVisibility);

module.exports = router;
