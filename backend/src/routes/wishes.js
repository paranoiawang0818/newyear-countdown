const express = require('express');
const router = express.Router();
const {
  createWish,
  getPublicWishes,
} = require('../controllers/wishController');

// 公开路由 - 不需要登录
router.post('/', createWish);
router.get('/public', getPublicWishes);

module.exports = router;
