import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET /api/faq - Get all active FAQs
router.get('/', async (_req: Request, res: Response) => {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        question: true,
        answer: true,
        category: true,
      },
    });

    // Group FAQs by category
    const grouped = faqs.reduce((acc: Record<string, typeof faqs>, faq: (typeof faqs)[number]) => {
      const cat = faq.category || 'General';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(faq);
      return acc;
    }, {});

    res.json({ faqs, grouped });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

export default router;
