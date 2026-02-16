const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create wish - 不需要登录
const createWish = async (req, res) => {
  try {
    const { content, nickname } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: '请输入心愿内容' });
    }

    if (content.length > 500) {
      return res.status(400).json({ error: '心愿内容不能超过500字' });
    }

    const wish = await prisma.wish.create({
      data: {
        content: content.trim(),
        nickname: nickname?.trim() || '匿名',
        isVisible: true,
      },
    });

    res.status(201).json({ wish });
  } catch (error) {
    console.error('Create wish error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

// Get all public wishes
const getPublicWishes = async (req, res) => {
  try {
    const wishes = await prisma.wish.findMany({
      where: {
        isVisible: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({ wishes });
  } catch (error) {
    console.error('Get wishes error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

module.exports = {
  createWish,
  getPublicWishes,
};
