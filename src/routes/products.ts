import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET /api/products - List all products with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      category,
      search,
      availability,
      featured,
      sort = 'newest',
      page = '1',
      limit = '12',
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string) || 12));
    const skip = (pageNum - 1) * limitNum;

    // Build filter conditions
    const where: any = {
      isPublished: true,
    };

    if (category) {
      where.category = { slug: category as string };
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { shortDescription: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { tags: { has: (search as string).toLowerCase() } },
      ];
    }

    if (availability) {
      where.availability = availability;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    // Build sort options
    let orderBy: any = { createdAt: 'desc' };
    switch (sort) {
      case 'price-low':
        orderBy = { price: 'asc' };
        break;
      case 'price-high':
        orderBy = { price: 'desc' };
        break;
      case 'popular':
        orderBy = { viewCount: 'desc' };
        break;
      case 'name':
        orderBy = { name: 'asc' };
        break;
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        hasMore: pageNum * limitNum < total,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:slug - Get single product by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    if (!product || !product.isPublished) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Increment view count (fire and forget)
    prisma.product.update({
      where: { slug },
      data: { viewCount: { increment: 1 } },
    }).catch(() => {});

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;
