import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET /api/categories - List all active categories
router.get('/', async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: {
            products: {
              where: { isPublished: true },
            },
          },
        },
      },
    });

    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /api/categories/:slug - Get category with its products
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isPublished: true },
          orderBy: { order: 'asc' },
          take: 50,
        },
      },
    });

    if (!category || !category.isActive) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

export default router;
