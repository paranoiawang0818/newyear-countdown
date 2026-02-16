const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create wish
const createWish = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Wish content is required' });
    }

    if (content.length > 500) {
      return res.status(400).json({ error: 'Wish content must be less than 500 characters' });
    }

    const wish = await prisma.wish.create({
      data: {
        content: content.trim(),
        userId: req.user.userId,
        isVisible: true, // 默认公开
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.status(201).json({ wish });
  } catch (error) {
    console.error('Create wish error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get my wishes
const getMyWishes = async (req, res) => {
  try {
    const wishes = await prisma.wish.findMany({
      where: {
        userId: req.user.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({ wishes });
  } catch (error) {
    console.error('Get my wishes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all wishes (admin only)
const getAllWishes = async (req, res) => {
  try {
    const wishes = await prisma.wish.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({ wishes });
  } catch (error) {
    console.error('Get all wishes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get public wishes
const getPublicWishes = async (req, res) => {
  try {
    const wishes = await prisma.wish.findMany({
      where: {
        isVisible: true,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({ wishes });
  } catch (error) {
    console.error('Get public wishes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update wish visibility (admin only)
const updateWishVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { isVisible } = req.body;

    if (typeof isVisible !== 'boolean') {
      return res.status(400).json({ error: 'isVisible must be a boolean' });
    }

    const wish = await prisma.wish.update({
      where: { id: parseInt(id) },
      data: { isVisible },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.json({ wish });
  } catch (error) {
    console.error('Update visibility error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete wish
const deleteWish = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the wish first
    const wish = await prisma.wish.findUnique({
      where: { id: parseInt(id) },
    });

    if (!wish) {
      return res.status(404).json({ error: 'Wish not found' });
    }

    // Check if user owns the wish or is admin
    if (wish.userId !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Not authorized to delete this wish' });
    }

    await prisma.wish.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Wish deleted successfully' });
  } catch (error) {
    console.error('Delete wish error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createWish,
  getMyWishes,
  getAllWishes,
  getPublicWishes,
  updateWishVisibility,
  deleteWish,
};
