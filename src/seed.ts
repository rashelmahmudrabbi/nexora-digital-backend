import prisma from './lib/prisma';

async function seed() {
  console.log('🌱 Seeding database...');

  // ─── Categories ─────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'ai-productivity' },
      update: {},
      create: {
        name: 'AI & Productivity',
        slug: 'ai-productivity',
        description: 'AI subscriptions, productivity tools, and software to boost your workflow.',
        icon: 'brain',
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'gaming-topups' },
      update: {},
      create: {
        name: 'Gaming Top-Ups',
        slug: 'gaming-topups',
        description: 'In-game currency, diamonds, UC, gems, and more for your favorite mobile games.',
        icon: 'gamepad',
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'software-digital' },
      update: {},
      create: {
        name: 'Software & Digital Goods',
        slug: 'software-digital',
        description: 'Licensed software, digital gift cards, and other digital services.',
        icon: 'package',
        order: 3,
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // ─── Products ───────────────────────────────────────────────────────
  const products = await Promise.all([
    // AI & Productivity
    prisma.product.upsert({
      where: { slug: 'chatgpt-plus-1-month' },
      update: {},
      create: {
        name: 'ChatGPT Plus Subscription',
        slug: 'chatgpt-plus-1-month',
        shortDescription: 'Access GPT-4, faster responses, and priority access for 1 month.',
        description: `Get access to OpenAI's most capable model with ChatGPT Plus. Enjoy GPT-4 access, faster response times, and priority access even during peak hours.\n\n**What's included:**\n- GPT-4 access\n- Faster response speed\n- Priority access during high demand\n- Access to new features first\n\n**Note:** This is an eligible subscription activated through authorized methods. Regional availability may vary.`,
        categoryId: categories[0].id,
        price: 2500,
        originalPrice: 2800,
        availability: 'IN_STOCK',
        region: 'Global',
        plan: 'Plus - 1 Month',
        deliveryTime: '1-24 hours',
        fulfillmentMethod: 'Account activation via email',
        requirements: 'Valid email address',
        restrictions: 'One subscription per account. Must comply with OpenAI terms of service.',
        refundTerms: 'Refund available within 24 hours if activation fails. No refund after successful activation.',
        supportPeriod: '30 days',
        isFeatured: true,
        tags: ['ai', 'chatgpt', 'openai', 'gpt4', 'subscription'],
        order: 1,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'canva-pro-1-month' },
      update: {},
      create: {
        name: 'Canva Pro Subscription',
        slug: 'canva-pro-1-month',
        shortDescription: 'Premium design tools, templates, and brand kits for 1 month.',
        description: `Unlock the full power of Canva with a Pro subscription. Access premium templates, advanced design tools, Brand Kit, Background Remover, and more.\n\n**What's included:**\n- 100+ million premium stock photos, videos, audio\n- 610,000+ premium and free templates\n- Background Remover\n- Magic Resize\n- Brand Kit\n- 1TB cloud storage`,
        categoryId: categories[0].id,
        price: 800,
        availability: 'IN_STOCK',
        region: 'Global',
        plan: 'Pro - 1 Month',
        deliveryTime: '1-12 hours',
        fulfillmentMethod: 'Team invitation via email',
        requirements: 'Valid email address, Canva account',
        restrictions: 'Subject to Canva terms of service.',
        refundTerms: 'Refund within 24 hours if access not provided.',
        supportPeriod: '30 days',
        isFeatured: true,
        tags: ['design', 'canva', 'graphics', 'subscription'],
        order: 2,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'grammarly-premium-1-month' },
      update: {},
      create: {
        name: 'Grammarly Premium',
        slug: 'grammarly-premium-1-month',
        shortDescription: 'Advanced grammar, style, and tone suggestions for professional writing.',
        description: `Elevate your writing with Grammarly Premium. Get advanced grammar checks, vocabulary enhancement, plagiarism detection, and writing style improvements.\n\n**What's included:**\n- Advanced grammar and punctuation checks\n- Vocabulary enhancement suggestions\n- Genre-specific writing style checks\n- Plagiarism detector\n- Word choice improvements`,
        categoryId: categories[0].id,
        price: 600,
        availability: 'ON_REQUEST',
        region: 'Global',
        plan: 'Premium - 1 Month',
        deliveryTime: '12-48 hours',
        fulfillmentMethod: 'Account credentials or team access',
        requirements: 'Valid email address',
        restrictions: 'Subject to Grammarly terms.',
        refundTerms: 'Refund within 24 hours if access not provided.',
        supportPeriod: '30 days',
        tags: ['writing', 'grammarly', 'productivity', 'subscription'],
        order: 3,
      },
    }),

    // Gaming Top-Ups
    prisma.product.upsert({
      where: { slug: 'free-fire-100-diamonds' },
      update: {},
      create: {
        name: 'Free Fire 100 Diamonds',
        slug: 'free-fire-100-diamonds',
        shortDescription: '100 diamonds for Garena Free Fire. Instant top-up via Player ID.',
        description: `Top up 100 diamonds to your Free Fire account instantly. Use diamonds to purchase characters, weapon skins, pets, and more in the Free Fire store.\n\n**How it works:**\n1. Provide your Free Fire Player ID\n2. We process the top-up through authorized channels\n3. Diamonds appear in your account\n\n**Important:** Double-check your Player ID before ordering.`,
        categoryId: categories[1].id,
        price: 120,
        availability: 'IN_STOCK',
        region: 'Bangladesh Server',
        plan: '100 Diamonds',
        deliveryTime: '5-30 minutes',
        fulfillmentMethod: 'Direct top-up via Player ID',
        requirements: 'Free Fire Player ID (numeric)',
        restrictions: 'Bangladesh server only. Player ID must be valid and active.',
        refundTerms: 'No refund after diamonds are credited. Refund for failed top-ups only.',
        supportPeriod: '24 hours',
        isFeatured: true,
        tags: ['freefire', 'diamonds', 'gaming', 'topup', 'garena'],
        order: 1,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'free-fire-310-diamonds' },
      update: {},
      create: {
        name: 'Free Fire 310 Diamonds',
        slug: 'free-fire-310-diamonds',
        shortDescription: '310 diamonds for Garena Free Fire. Best value pack.',
        description: `Top up 310 diamonds to your Free Fire account. Great value for skins, characters, and in-game events.\n\n**How it works:**\n1. Provide your Free Fire Player ID\n2. We process the top-up\n3. Diamonds appear in your account within minutes`,
        categoryId: categories[1].id,
        price: 320,
        availability: 'IN_STOCK',
        region: 'Bangladesh Server',
        plan: '310 Diamonds',
        deliveryTime: '5-30 minutes',
        fulfillmentMethod: 'Direct top-up via Player ID',
        requirements: 'Free Fire Player ID (numeric)',
        restrictions: 'Bangladesh server only.',
        refundTerms: 'No refund after diamonds are credited.',
        supportPeriod: '24 hours',
        tags: ['freefire', 'diamonds', 'gaming', 'topup'],
        order: 2,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'pubg-mobile-60-uc' },
      update: {},
      create: {
        name: 'PUBG Mobile 60 UC',
        slug: 'pubg-mobile-60-uc',
        shortDescription: '60 UC for PUBG Mobile. Quick and reliable top-up.',
        description: `Get 60 Unknown Cash (UC) for PUBG Mobile. Use UC to purchase the Royale Pass, outfits, weapon skins, and more.\n\n**How it works:**\n1. Provide your PUBG Mobile Player ID\n2. We process the UC top-up\n3. UC appears in your account`,
        categoryId: categories[1].id,
        price: 85,
        availability: 'IN_STOCK',
        region: 'Global',
        plan: '60 UC',
        deliveryTime: '5-30 minutes',
        fulfillmentMethod: 'Direct top-up via Player ID',
        requirements: 'PUBG Mobile Player ID',
        restrictions: 'Valid active PUBG Mobile account required.',
        refundTerms: 'No refund after UC is credited.',
        supportPeriod: '24 hours',
        isFeatured: true,
        tags: ['pubg', 'uc', 'gaming', 'topup', 'mobile'],
        order: 3,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'pubg-mobile-325-uc' },
      update: {},
      create: {
        name: 'PUBG Mobile 325 UC',
        slug: 'pubg-mobile-325-uc',
        shortDescription: '325 UC for PUBG Mobile. Perfect for Royale Pass.',
        description: `Top up 325 UC to your PUBG Mobile account. Enough for a Royale Pass and more.\n\n**Popular uses:**\n- Royale Pass purchase\n- Premium crate openings\n- Outfit and skin purchases`,
        categoryId: categories[1].id,
        price: 400,
        availability: 'IN_STOCK',
        region: 'Global',
        plan: '325 UC',
        deliveryTime: '5-30 minutes',
        fulfillmentMethod: 'Direct top-up via Player ID',
        requirements: 'PUBG Mobile Player ID',
        restrictions: 'Valid active PUBG Mobile account required.',
        refundTerms: 'No refund after UC is credited.',
        supportPeriod: '24 hours',
        tags: ['pubg', 'uc', 'gaming', 'topup', 'mobile'],
        order: 4,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'clash-of-clans-80-gems' },
      update: {},
      create: {
        name: 'Clash of Clans 80 Gems',
        slug: 'clash-of-clans-80-gems',
        shortDescription: '80 gems for Clash of Clans. Speed up your village progress.',
        description: `Add 80 gems to your Clash of Clans account. Use gems to speed up building, train troops faster, and boost your village.\n\n**How it works:**\n1. Provide your Supercell ID or Player Tag\n2. We process the gem purchase\n3. Gems appear in your account`,
        categoryId: categories[1].id,
        price: 100,
        availability: 'ON_REQUEST',
        region: 'Global',
        plan: '80 Gems',
        deliveryTime: '1-6 hours',
        fulfillmentMethod: 'Via Supercell ID',
        requirements: 'Supercell ID or Player Tag',
        restrictions: 'Account must be linked to Supercell ID.',
        refundTerms: 'Refund only for failed deliveries.',
        supportPeriod: '24 hours',
        tags: ['coc', 'gems', 'gaming', 'supercell', 'clash'],
        order: 5,
      },
    }),

    // Software & Digital Goods
    prisma.product.upsert({
      where: { slug: 'spotify-premium-1-month' },
      update: {},
      create: {
        name: 'Spotify Premium',
        slug: 'spotify-premium-1-month',
        shortDescription: 'Ad-free music streaming with offline downloads for 1 month.',
        description: `Enjoy ad-free music streaming with Spotify Premium. Listen offline, enjoy higher audio quality, and skip unlimited tracks.\n\n**What's included:**\n- Ad-free listening\n- Offline downloads\n- High quality audio\n- Unlimited skips\n- Play any song on demand`,
        categoryId: categories[2].id,
        price: 250,
        availability: 'IN_STOCK',
        region: 'Bangladesh',
        plan: 'Individual - 1 Month',
        deliveryTime: '1-12 hours',
        fulfillmentMethod: 'Family/Duo plan invitation',
        requirements: 'Spotify account with valid email',
        restrictions: 'Must comply with Spotify terms of service.',
        refundTerms: 'Refund within 24 hours if activation fails.',
        supportPeriod: '30 days',
        isFeatured: true,
        tags: ['spotify', 'music', 'streaming', 'premium'],
        order: 1,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'youtube-premium-1-month' },
      update: {},
      create: {
        name: 'YouTube Premium',
        slug: 'youtube-premium-1-month',
        shortDescription: 'Ad-free videos, background play, and YouTube Music for 1 month.',
        description: `Watch YouTube without ads, play videos in the background, download for offline viewing, and get YouTube Music Premium included.\n\n**What's included:**\n- Ad-free video streaming\n- Background play\n- Offline downloads\n- YouTube Music Premium\n- YouTube Originals`,
        categoryId: categories[2].id,
        price: 200,
        availability: 'IN_STOCK',
        region: 'Bangladesh',
        plan: 'Individual - 1 Month',
        deliveryTime: '1-24 hours',
        fulfillmentMethod: 'Family plan invitation',
        requirements: 'Google account',
        restrictions: 'Must comply with YouTube terms.',
        refundTerms: 'Refund within 24 hours if activation fails.',
        supportPeriod: '30 days',
        tags: ['youtube', 'video', 'streaming', 'premium', 'music'],
        order: 2,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // ─── FAQs ───────────────────────────────────────────────────────────
  const faqs = await Promise.all([
    prisma.fAQ.upsert({
      where: { id: 'faq-1' },
      update: {},
      create: {
        id: 'faq-1',
        question: 'How do I place an order?',
        answer: 'Browse our products, select the item you want, provide the required details (like Player ID for gaming top-ups), choose your payment method, and complete the payment. You will receive an order reference for tracking.',
        category: 'Ordering',
        order: 1,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-2' },
      update: {},
      create: {
        id: 'faq-2',
        question: 'Which regions are supported?',
        answer: 'Most of our products are available for Bangladesh. Some products like gaming top-ups may support global servers. Please check the product page for specific region/server information.',
        category: 'Ordering',
        order: 2,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-3' },
      update: {},
      create: {
        id: 'faq-3',
        question: 'How long does delivery take?',
        answer: 'Delivery times vary by product. Gaming top-ups are typically delivered within 5-30 minutes. Subscriptions and digital products may take 1-24 hours. Check each product page for specific delivery estimates.',
        category: 'Delivery',
        order: 3,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-4' },
      update: {},
      create: {
        id: 'faq-4',
        question: 'What if a product is unavailable?',
        answer: 'If a product shows "On Request", contact our support team to check availability. We will confirm the product status and provide an estimated delivery time before you make a payment.',
        category: 'Delivery',
        order: 4,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-5' },
      update: {},
      create: {
        id: 'faq-5',
        question: 'What is the refund process?',
        answer: 'If we are unable to fulfil your order, a full refund will be issued. For gaming top-ups, refunds are only available for failed deliveries. Refund requests must be made within 24 hours of purchase. Contact our support team with your order reference.',
        category: 'Refund',
        order: 5,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-6' },
      update: {},
      create: {
        id: 'faq-6',
        question: 'What information do I need for a gaming top-up?',
        answer: 'For gaming top-ups, you typically need your Player ID or Game UID. We never ask for your account password, OTP, or any sensitive login credentials. Only provide your Player ID as shown in the game.',
        category: 'Gaming',
        order: 6,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-7' },
      update: {},
      create: {
        id: 'faq-7',
        question: 'What payment methods are available?',
        answer: 'We currently support bKash and Nagad for payments in Bangladesh. Please follow the payment instructions provided during checkout. Never share your payment PIN or OTP with anyone.',
        category: 'Payment',
        order: 7,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-8' },
      update: {},
      create: {
        id: 'faq-8',
        question: 'Is my personal information safe?',
        answer: 'Yes. We only collect information necessary to fulfil your order. We never ask for account passwords, OTPs, recovery codes, payment PINs, or private keys. Your data is handled securely and in accordance with our Privacy Policy.',
        category: 'Security',
        order: 8,
      },
    }),
  ]);

  console.log(`✅ Created ${faqs.length} FAQs`);

  console.log('\n🎉 Database seeded successfully!');
}

seed()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
