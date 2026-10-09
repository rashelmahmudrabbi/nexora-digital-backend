import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';

const router = Router();

// Validation schema for creating an order
const orderSchema = z.object({
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email().max(255),
  customerPhone: z.string().max(20).optional(),
  customerNotes: z.string().max(500).optional(),
  paymentMethod: z.string().max(50).optional(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().min(1).max(10),
    region: z.string().optional(),
    playerInfo: z.string().optional(),
  })).min(1, 'At least one item is required'),
});

// Generate a unique order reference
function generateOrderRef(): string {
  const prefix = 'NXD';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// POST /api/orders - Create a new order
router.post('/', async (req: Request, res: Response) => {
  try {
    const result = orderSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.flatten().fieldErrors,
      });
    }

    const { customerName, customerEmail, customerPhone, customerNotes, paymentMethod, items } = result.data;

    // Fetch products and validate availability
    const productIds = items.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        isPublished: true,
      },
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({ error: 'One or more products are unavailable' });
    }

    // Check for unavailable products
    const unavailable = products.filter((p: (typeof products)[number]) => p.availability === 'UNAVAILABLE');
    if (unavailable.length > 0) {
      return res.status(400).json({
        error: `The following products are currently unavailable: ${unavailable.map((p: (typeof products)[number]) => p.name).join(', ')}`,
      });
    }

    // Calculate totals
    const orderItems = items.map(item => {
      const product = products.find((p: (typeof products)[number]) => p.id === item.productId)!;
      return {
        productId: item.productId,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        totalPrice: product.price * item.quantity,
        region: item.region,
        playerInfo: item.playerInfo,
      };
    });

    const totalAmount = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

    // Create order with items
    const order = await prisma.order.create({
      data: {
        orderRef: generateOrderRef(),
        customerName,
        customerEmail,
        customerPhone,
        customerNotes,
        paymentMethod,
        totalAmount,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json({
      message: 'Order created successfully',
      orderRef: order.orderRef,
      totalAmount: order.totalAmount,
      status: order.status,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order. Please try again.' });
  }
});

// GET /api/orders/track/:ref - Track order by reference
router.get('/track/:ref', async (req: Request, res: Response) => {
  try {
    const ref = req.params.ref as string;
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required for order tracking' });
    }

    const order = await prisma.order.findFirst({
      where: {
        orderRef: ref,
        customerEmail: email as string,
      },
      select: {
        orderRef: true,
        status: true,
        totalAmount: true,
        createdAt: true,
        items: {
          select: {
            productName: true,
            quantity: true,
            unitPrice: true,
            totalPrice: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found. Please check your order reference and email.' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error tracking order:', error);
    res.status(500).json({ error: 'Failed to track order' });
  }
});

export default router;
