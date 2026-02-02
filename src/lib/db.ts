// Database simulation for BYTEWISE Electronics E-Commerce
// In production, replace with PostgreSQL/MongoDB connection

import { 
  Category, 
  Brand, 
  Order, 
  WalletTransaction, 
  CartItem, 
  Address, 
  Coupon,
  AuthUser
} from '@/types';

// Extended Product type for database
interface DBProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  brandId: string;
  price: number;
  mrp: number;
  discount: number;
  stock: number;
  images: { url: string; alt: string; isPrimary: boolean }[];
  specifications: Record<string, string>;
  highlights: string[];
  warranty: string;
  rating: { average: number; count: number };
  badges: string[];
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Extended Coupon for database
interface DBCoupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue: number;
  maxDiscount: number;
  validFrom: Date;
  validTo: Date;
  usageLimit: number;
  isActive: boolean;
}

// ==================== CATEGORIES ====================
export const categories: Category[] = [
  {
    id: 'cat_001',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Latest smartphones from top brands',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    productCount: 45
  },
  {
    id: 'cat_002',
    name: 'Laptops',
    slug: 'laptops',
    description: 'Powerful laptops for work and gaming',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    productCount: 38
  },
  {
    id: 'cat_003',
    name: 'Televisions',
    slug: 'televisions',
    description: 'Smart TVs with stunning displays',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
    productCount: 28
  },
  {
    id: 'cat_004',
    name: 'Audio',
    slug: 'audio',
    description: 'Headphones, speakers, and audio equipment',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    productCount: 56
  },
  {
    id: 'cat_005',
    name: 'Wearables',
    slug: 'wearables',
    description: 'Smartwatches and fitness trackers',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    productCount: 32
  },
  {
    id: 'cat_006',
    name: 'Gaming',
    slug: 'gaming',
    description: 'Gaming consoles and accessories',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800',
    productCount: 24
  },
  {
    id: 'cat_007',
    name: 'Cameras',
    slug: 'cameras',
    description: 'Digital cameras and photography gear',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    productCount: 19
  },
  {
    id: 'cat_008',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Cables, chargers, and more',
    image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=800',
    productCount: 87
  }
];

// ==================== BRANDS ====================
export const brands: Brand[] = [
  { id: 'brand_001', name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png', slug: 'apple' },
  { id: 'brand_002', name: 'Samsung', logo: 'https://images.unsplash.com/photo-1587817229766-43c2e826ad68?w=200', slug: 'samsung' },
  { id: 'brand_003', name: 'Sony', logo: 'https://images.unsplash.com/photo-1617945813375-7b55a6b0b1a4?w=200', slug: 'sony' },
  { id: 'brand_004', name: 'LG', logo: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=200', slug: 'lg' },
  { id: 'brand_005', name: 'Dell', logo: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200', slug: 'dell' },
  { id: 'brand_006', name: 'HP', logo: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=200', slug: 'hp' },
  { id: 'brand_007', name: 'OnePlus', logo: 'https://images.unsplash.com/photo-1609692814857-2a55c17e09e5?w=200', slug: 'oneplus' },
  { id: 'brand_008', name: 'JBL', logo: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200', slug: 'jbl' },
  { id: 'brand_009', name: 'Bose', logo: 'https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?w=200', slug: 'bose' },
  { id: 'brand_010', name: 'Canon', logo: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200', slug: 'canon' }
];

// ==================== PRODUCTS ====================
export const products: DBProduct[] = [
  // Smartphones
  {
    id: 'prod_001',
    sku: 'BW-IPH-15PRO-256',
    name: 'iPhone 15 Pro Max 256GB',
    slug: 'iphone-15-pro-max-256gb',
    description: 'The most powerful iPhone ever with A17 Pro chip, titanium design, and Action button. Features a 48MP main camera with 5x optical zoom.',
    shortDescription: 'A17 Pro chip, Titanium Design, 48MP Camera',
    categoryId: 'cat_001',
    brandId: 'brand_001',
    price: 134900,
    mrp: 159900,
    discount: 16,
    stock: 45,
    images: [
      { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', alt: 'iPhone 15 Pro Max Front', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800', alt: 'iPhone 15 Pro Max Back', isPrimary: false }
    ],
    specifications: {
      'Display': '6.7" Super Retina XDR OLED',
      'Processor': 'A17 Pro Chip',
      'RAM': '8GB',
      'Storage': '256GB',
      'Camera': '48MP + 12MP + 12MP',
      'Battery': '4422 mAh',
      'OS': 'iOS 17'
    },
    highlights: ['A17 Pro chip with 6-core GPU', 'Titanium design', 'Action button', '48MP main camera', '5x optical zoom'],
    warranty: '1 Year Apple Warranty',
    rating: { average: 4.8, count: 2340 },
    badges: ['bestseller', 'premium'],
    inStock: true,
    createdAt: new Date('2024-09-22'),
    updatedAt: new Date('2026-01-15')
  },
  {
    id: 'prod_002',
    sku: 'BW-SAM-S24U-256',
    name: 'Samsung Galaxy S24 Ultra 256GB',
    slug: 'samsung-galaxy-s24-ultra-256gb',
    description: 'Galaxy AI powered flagship with built-in S Pen, 200MP camera, and Snapdragon 8 Gen 3 processor.',
    shortDescription: 'Galaxy AI, 200MP Camera, S Pen included',
    categoryId: 'cat_001',
    brandId: 'brand_002',
    price: 119999,
    mrp: 134999,
    discount: 11,
    stock: 62,
    images: [
      { url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800', alt: 'Galaxy S24 Ultra', isPrimary: true }
    ],
    specifications: {
      'Display': '6.8" Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'RAM': '12GB',
      'Storage': '256GB',
      'Camera': '200MP + 12MP + 50MP + 10MP',
      'Battery': '5000 mAh',
      'OS': 'Android 14, One UI 6.1'
    },
    highlights: ['Galaxy AI features', 'S Pen included', '200MP main sensor', 'Titanium frame', '45W fast charging'],
    warranty: '1 Year Samsung Warranty',
    rating: { average: 4.7, count: 1890 },
    badges: ['new'],
    inStock: true,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2026-01-20')
  },
  {
    id: 'prod_003',
    sku: 'BW-OP-12-256',
    name: 'OnePlus 12 256GB',
    slug: 'oneplus-12-256gb',
    description: 'Flagship killer with Snapdragon 8 Gen 3, 50MP Hasselblad camera, and 100W SUPERVOOC charging.',
    shortDescription: 'Hasselblad Camera, 100W Charging',
    categoryId: 'cat_001',
    brandId: 'brand_007',
    price: 64999,
    mrp: 69999,
    discount: 7,
    stock: 89,
    images: [
      { url: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800', alt: 'OnePlus 12', isPrimary: true }
    ],
    specifications: {
      'Display': '6.82" LTPO AMOLED',
      'Processor': 'Snapdragon 8 Gen 3',
      'RAM': '12GB',
      'Storage': '256GB',
      'Camera': '50MP + 64MP + 48MP',
      'Battery': '5400 mAh',
      'OS': 'Android 14, OxygenOS 14'
    },
    highlights: ['Hasselblad camera', '100W SUPERVOOC', '50W wireless charging', 'Dolby Vision'],
    warranty: '1 Year OnePlus Warranty',
    rating: { average: 4.6, count: 1456 },
    badges: ['bestseller'],
    inStock: true,
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2026-01-18')
  },

  // Laptops
  {
    id: 'prod_004',
    sku: 'BW-MBP-14-M3PRO',
    name: 'MacBook Pro 14" M3 Pro 512GB',
    slug: 'macbook-pro-14-m3-pro-512gb',
    description: 'Supercharged by M3 Pro chip with up to 18 hours battery life, Liquid Retina XDR display, and MagSafe charging.',
    shortDescription: 'M3 Pro chip, 18hr Battery, XDR Display',
    categoryId: 'cat_002',
    brandId: 'brand_001',
    price: 194900,
    mrp: 199900,
    discount: 3,
    stock: 28,
    images: [
      { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', alt: 'MacBook Pro 14', isPrimary: true }
    ],
    specifications: {
      'Display': '14.2" Liquid Retina XDR',
      'Processor': 'Apple M3 Pro',
      'RAM': '18GB Unified Memory',
      'Storage': '512GB SSD',
      'Battery': 'Up to 18 hours',
      'Ports': '3x Thunderbolt 4, HDMI, SD Card, MagSafe'
    },
    highlights: ['M3 Pro chip', 'Liquid Retina XDR display', '18-hour battery', 'Space Black finish', 'MagSafe charging'],
    warranty: '1 Year Apple Warranty',
    rating: { average: 4.9, count: 876 },
    badges: ['premium'],
    inStock: true,
    createdAt: new Date('2023-10-30'),
    updatedAt: new Date('2026-01-10')
  },
  {
    id: 'prod_005',
    sku: 'BW-DELL-XPS15-512',
    name: 'Dell XPS 15 Intel i7 512GB',
    slug: 'dell-xps-15-i7-512gb',
    description: 'Premium ultrabook with InfinityEdge display, 13th Gen Intel Core i7, and NVIDIA GeForce RTX 4050.',
    shortDescription: 'Intel i7, RTX 4050, 15.6" OLED',
    categoryId: 'cat_002',
    brandId: 'brand_005',
    price: 164999,
    mrp: 179999,
    discount: 8,
    stock: 34,
    images: [
      { url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800', alt: 'Dell XPS 15', isPrimary: true }
    ],
    specifications: {
      'Display': '15.6" 3.5K OLED',
      'Processor': 'Intel Core i7-13700H',
      'RAM': '16GB DDR5',
      'Storage': '512GB NVMe SSD',
      'Graphics': 'NVIDIA GeForce RTX 4050',
      'Battery': '86Whr'
    },
    highlights: ['InfinityEdge OLED display', 'CNC machined aluminum', 'RTX 4050 graphics', 'Thunderbolt 4'],
    warranty: '1 Year Dell Warranty + 1 Year Extended',
    rating: { average: 4.5, count: 654 },
    badges: [],
    inStock: true,
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2026-01-12')
  },

  // TVs
  {
    id: 'prod_006',
    sku: 'BW-SAM-TV55-QLED',
    name: 'Samsung 55" 4K QLED Smart TV',
    slug: 'samsung-55-4k-qled-smart-tv',
    description: 'Quantum Dot technology with Neural Quantum Processor 4K, Object Tracking Sound, and Gaming Hub.',
    shortDescription: 'QLED 4K, Neural Processor, Smart Hub',
    categoryId: 'cat_003',
    brandId: 'brand_002',
    price: 74990,
    mrp: 99900,
    discount: 25,
    stock: 42,
    images: [
      { url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800', alt: 'Samsung QLED TV', isPrimary: true }
    ],
    specifications: {
      'Display': '55" QLED 4K',
      'Resolution': '3840 x 2160',
      'Processor': 'Neural Quantum Processor 4K',
      'HDR': 'Quantum HDR+',
      'Audio': 'Object Tracking Sound',
      'Smart TV': 'Tizen OS'
    },
    highlights: ['Quantum Dot Color', 'Gaming Hub', '144Hz refresh rate', 'Object Tracking Sound+'],
    warranty: '2 Years Samsung Warranty',
    rating: { average: 4.6, count: 1234 },
    badges: ['bestseller', 'sale'],
    inStock: true,
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2026-01-14')
  },
  {
    id: 'prod_007',
    sku: 'BW-SONY-TV65-OLED',
    name: 'Sony 65" 4K OLED Bravia XR',
    slug: 'sony-65-4k-oled-bravia-xr',
    description: 'Premium OLED with Cognitive Processor XR, perfect blacks, and Acoustic Surface Audio+.',
    shortDescription: 'OLED 4K, Cognitive XR, Perfect Blacks',
    categoryId: 'cat_003',
    brandId: 'brand_003',
    price: 189990,
    mrp: 219900,
    discount: 14,
    stock: 18,
    images: [
      { url: 'https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=800', alt: 'Sony OLED TV', isPrimary: true }
    ],
    specifications: {
      'Display': '65" OLED 4K',
      'Resolution': '3840 x 2160',
      'Processor': 'Cognitive Processor XR',
      'HDR': 'Dolby Vision, HDR10, HLG',
      'Audio': 'Acoustic Surface Audio+',
      'Smart TV': 'Google TV'
    },
    highlights: ['Perfect blacks', 'XR Triluminos Pro', 'BRAVIA Core', 'PlayStation 5 features'],
    warranty: '3 Years Sony Warranty',
    rating: { average: 4.8, count: 567 },
    badges: ['premium'],
    inStock: true,
    createdAt: new Date('2023-07-10'),
    updatedAt: new Date('2026-01-08')
  },

  // Audio
  {
    id: 'prod_008',
    sku: 'BW-APP-AMAX',
    name: 'Apple AirPods Max',
    slug: 'apple-airpods-max',
    description: 'High-fidelity audio with Active Noise Cancellation, Spatial Audio, and premium design.',
    shortDescription: 'ANC, Spatial Audio, Premium Design',
    categoryId: 'cat_004',
    brandId: 'brand_001',
    price: 54900,
    mrp: 59900,
    discount: 8,
    stock: 67,
    images: [
      { url: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=800', alt: 'AirPods Max', isPrimary: true }
    ],
    specifications: {
      'Type': 'Over-ear Headphones',
      'Driver': '40mm Apple Dynamic Driver',
      'ANC': 'Active Noise Cancellation',
      'Spatial Audio': 'Dynamic Head Tracking',
      'Battery': 'Up to 20 hours',
      'Connectivity': 'Bluetooth 5.0, H1 chip'
    },
    highlights: ['Active Noise Cancellation', 'Transparency mode', 'Spatial Audio', 'Digital Crown', 'Premium materials'],
    warranty: '1 Year Apple Warranty',
    rating: { average: 4.7, count: 2890 },
    badges: ['premium'],
    inStock: true,
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2026-01-16')
  },
  {
    id: 'prod_009',
    sku: 'BW-SONY-WH1000XM5',
    name: 'Sony WH-1000XM5 Wireless',
    slug: 'sony-wh-1000xm5-wireless',
    description: 'Industry-leading noise cancellation with 30-hour battery life and multipoint connection.',
    shortDescription: 'Best-in-class ANC, 30hr Battery',
    categoryId: 'cat_004',
    brandId: 'brand_003',
    price: 26990,
    mrp: 34990,
    discount: 23,
    stock: 89,
    images: [
      { url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800', alt: 'Sony WH-1000XM5', isPrimary: true }
    ],
    specifications: {
      'Type': 'Over-ear Headphones',
      'Driver': '30mm',
      'ANC': 'HD Noise Cancellation Processor QN1',
      'Battery': 'Up to 30 hours',
      'Quick Charge': '3 min = 3 hours playback',
      'Connectivity': 'Bluetooth 5.2, Multipoint'
    },
    highlights: ['Auto NC Optimizer', '360 Reality Audio', 'Speak-to-Chat', 'Multipoint connection', 'Foldable design'],
    warranty: '1 Year Sony Warranty',
    rating: { average: 4.8, count: 4567 },
    badges: ['bestseller'],
    inStock: true,
    createdAt: new Date('2023-05-25'),
    updatedAt: new Date('2026-01-17')
  },
  {
    id: 'prod_010',
    sku: 'BW-JBL-CHARGE5',
    name: 'JBL Charge 5 Bluetooth Speaker',
    slug: 'jbl-charge-5-bluetooth-speaker',
    description: 'Portable Bluetooth speaker with powerful JBL Pro Sound, IP67 waterproof rating, and 20-hour playtime.',
    shortDescription: 'IP67 Waterproof, 20hr Battery',
    categoryId: 'cat_004',
    brandId: 'brand_008',
    price: 14999,
    mrp: 18999,
    discount: 21,
    stock: 124,
    images: [
      { url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800', alt: 'JBL Charge 5', isPrimary: true }
    ],
    specifications: {
      'Type': 'Portable Bluetooth Speaker',
      'Output': '40W',
      'Battery': '20 hours',
      'Waterproof': 'IP67',
      'Connectivity': 'Bluetooth 5.1',
      'Power Bank': 'Yes'
    },
    highlights: ['JBL Pro Sound', 'IP67 waterproof & dustproof', 'Built-in powerbank', 'PartyBoost', 'USB-C charging'],
    warranty: '1 Year JBL Warranty',
    rating: { average: 4.5, count: 3456 },
    badges: ['bestseller'],
    inStock: true,
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2026-01-19')
  },

  // Wearables
  {
    id: 'prod_011',
    sku: 'BW-APP-WATCH9',
    name: 'Apple Watch Series 9 45mm GPS',
    slug: 'apple-watch-series-9-45mm-gps',
    description: 'Most powerful Apple Watch with S9 SiP chip, Double Tap gesture, and precision finding for iPhone.',
    shortDescription: 'S9 Chip, Double Tap, Always-On',
    categoryId: 'cat_005',
    brandId: 'brand_001',
    price: 44900,
    mrp: 49900,
    discount: 10,
    stock: 56,
    images: [
      { url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800', alt: 'Apple Watch Series 9', isPrimary: true }
    ],
    specifications: {
      'Display': '45mm Always-On Retina LTPO',
      'Chip': 'S9 SiP',
      'Storage': '64GB',
      'Water Resistance': '50m',
      'Battery': 'Up to 18 hours',
      'Connectivity': 'GPS, Bluetooth 5.3'
    },
    highlights: ['Double Tap gesture', 'Precision Finding', 'Blood Oxygen', 'ECG app', 'Crash Detection'],
    warranty: '1 Year Apple Warranty',
    rating: { average: 4.7, count: 2134 },
    badges: ['new'],
    inStock: true,
    createdAt: new Date('2023-09-22'),
    updatedAt: new Date('2026-01-20')
  },
  {
    id: 'prod_012',
    sku: 'BW-SAM-WATCH6',
    name: 'Samsung Galaxy Watch 6 Classic 47mm',
    slug: 'samsung-galaxy-watch-6-classic-47mm',
    description: 'Premium smartwatch with rotating bezel, comprehensive health monitoring, and Wear OS.',
    shortDescription: 'Rotating Bezel, Health Monitor',
    categoryId: 'cat_005',
    brandId: 'brand_002',
    price: 35999,
    mrp: 43999,
    discount: 18,
    stock: 43,
    images: [
      { url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800', alt: 'Galaxy Watch 6 Classic', isPrimary: true }
    ],
    specifications: {
      'Display': '1.5" Super AMOLED',
      'Processor': 'Exynos W930',
      'RAM': '2GB',
      'Storage': '16GB',
      'Water Resistance': '5ATM + IP68',
      'Battery': '425mAh'
    },
    highlights: ['Rotating bezel', 'BioActive Sensor', 'Sleep coaching', 'Wear OS 4', 'Sapphire Crystal'],
    warranty: '1 Year Samsung Warranty',
    rating: { average: 4.5, count: 987 },
    badges: [],
    inStock: true,
    createdAt: new Date('2023-08-11'),
    updatedAt: new Date('2026-01-18')
  },

  // Gaming
  {
    id: 'prod_013',
    sku: 'BW-SONY-PS5-STD',
    name: 'PlayStation 5 Console',
    slug: 'playstation-5-console',
    description: 'Next-gen gaming with 4K graphics, ultra-high speed SSD, 3D Audio, and DualSense controller.',
    shortDescription: '4K Gaming, Ultra-High Speed SSD',
    categoryId: 'cat_006',
    brandId: 'brand_003',
    price: 54990,
    mrp: 54990,
    discount: 0,
    stock: 23,
    images: [
      { url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800', alt: 'PlayStation 5', isPrimary: true }
    ],
    specifications: {
      'CPU': 'AMD Zen 2 8-core 3.5GHz',
      'GPU': '10.28 TFLOPS, 36 CUs @ 2.23GHz',
      'RAM': '16GB GDDR6',
      'Storage': '825GB Custom SSD',
      'Optical Drive': '4K Blu-ray',
      'Output': '4K @ 120Hz, 8K'
    },
    highlights: ['Lightning-fast SSD', 'Ray Tracing', '3D Audio', 'DualSense controller', 'Backward compatible'],
    warranty: '1 Year Sony Warranty',
    rating: { average: 4.9, count: 5678 },
    badges: ['bestseller'],
    inStock: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2026-01-21')
  },

  // Cameras
  {
    id: 'prod_014',
    sku: 'BW-CANON-R6II',
    name: 'Canon EOS R6 Mark II Body',
    slug: 'canon-eos-r6-mark-ii-body',
    description: 'Full-frame mirrorless camera with 24.2MP sensor, 4K 60p video, and up to 40fps continuous shooting.',
    shortDescription: '24.2MP Full Frame, 4K 60p',
    categoryId: 'cat_007',
    brandId: 'brand_010',
    price: 229990,
    mrp: 249990,
    discount: 8,
    stock: 12,
    images: [
      { url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', alt: 'Canon EOS R6 Mark II', isPrimary: true }
    ],
    specifications: {
      'Sensor': '24.2MP Full-Frame CMOS',
      'Processor': 'DIGIC X',
      'ISO Range': '100-102400',
      'Video': '4K 60p, 6K RAW',
      'AF Points': '1053 points',
      'Stabilization': 'Up to 8 stops IBIS'
    },
    highlights: ['40fps continuous shooting', 'Deep Learning AF', '6K RAW video', 'In-body stabilization', 'Dual card slots'],
    warranty: '2 Years Canon Warranty',
    rating: { average: 4.8, count: 345 },
    badges: ['premium'],
    inStock: true,
    createdAt: new Date('2023-11-02'),
    updatedAt: new Date('2026-01-15')
  },

  // Accessories
  {
    id: 'prod_015',
    sku: 'BW-APP-MAGSAFE',
    name: 'Apple MagSafe Charger',
    slug: 'apple-magsafe-charger',
    description: 'Wireless charger that perfectly aligns with iPhone for faster wireless charging up to 15W.',
    shortDescription: 'Wireless 15W, Perfect Alignment',
    categoryId: 'cat_008',
    brandId: 'brand_001',
    price: 4500,
    mrp: 4900,
    discount: 8,
    stock: 234,
    images: [
      { url: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=800', alt: 'MagSafe Charger', isPrimary: true }
    ],
    specifications: {
      'Output': 'Up to 15W',
      'Compatibility': 'iPhone 12 and later',
      'Cable Length': '1m',
      'Connector': 'USB-C'
    },
    highlights: ['Magnetic alignment', 'Fast 15W charging', 'Compatible with MagSafe cases', 'USB-C connector'],
    warranty: '1 Year Apple Warranty',
    rating: { average: 4.4, count: 5678 },
    badges: [],
    inStock: true,
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2026-01-10')
  },
  {
    id: 'prod_016',
    sku: 'BW-SAM-45WCHARGER',
    name: 'Samsung 45W Super Fast Charger',
    slug: 'samsung-45w-super-fast-charger',
    description: 'Super Fast Charging 2.0 adapter with USB-C port for Galaxy devices.',
    shortDescription: '45W Super Fast Charging',
    categoryId: 'cat_008',
    brandId: 'brand_002',
    price: 2999,
    mrp: 3999,
    discount: 25,
    stock: 312,
    images: [
      { url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800', alt: 'Samsung 45W Charger', isPrimary: true }
    ],
    specifications: {
      'Output': '45W PD',
      'Ports': '1x USB-C',
      'Protocol': 'PD 3.0, PPS',
      'Input': '100-240V'
    },
    highlights: ['Super Fast Charging 2.0', 'Compact design', 'PD 3.0 compatible', 'Foldable plug'],
    warranty: '1 Year Samsung Warranty',
    rating: { average: 4.3, count: 2345 },
    badges: ['sale'],
    inStock: true,
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2026-01-12')
  },

  // More products for variety
  {
    id: 'prod_017',
    sku: 'BW-BOSE-QC45',
    name: 'Bose QuietComfort 45',
    slug: 'bose-quietcomfort-45',
    description: 'Premium noise-cancelling headphones with legendary Bose sound and all-day comfort.',
    shortDescription: 'World-Class ANC, 24hr Battery',
    categoryId: 'cat_004',
    brandId: 'brand_009',
    price: 26900,
    mrp: 32900,
    discount: 18,
    stock: 78,
    images: [
      { url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800', alt: 'Bose QC45', isPrimary: true }
    ],
    specifications: {
      'Type': 'Over-ear Headphones',
      'ANC': 'Active Noise Cancelling',
      'Battery': 'Up to 24 hours',
      'Quick Charge': '15 min = 3 hours',
      'Connectivity': 'Bluetooth 5.1',
      'Weight': '238g'
    },
    highlights: ['Legendary Bose ANC', 'Aware Mode', 'High-fidelity audio', 'TriPort acoustic', 'All-day comfort'],
    warranty: '1 Year Bose Warranty',
    rating: { average: 4.6, count: 3421 },
    badges: ['bestseller'],
    inStock: true,
    createdAt: new Date('2023-04-20'),
    updatedAt: new Date('2026-01-14')
  },
  {
    id: 'prod_018',
    sku: 'BW-HP-ENVY15',
    name: 'HP Envy x360 15 2-in-1',
    slug: 'hp-envy-x360-15-2-in-1',
    description: 'Versatile 2-in-1 laptop with AMD Ryzen 7, 15.6" OLED touchscreen, and 16GB RAM.',
    shortDescription: 'Ryzen 7, OLED Touch, 2-in-1',
    categoryId: 'cat_002',
    brandId: 'brand_006',
    price: 94999,
    mrp: 109999,
    discount: 14,
    stock: 45,
    images: [
      { url: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=800', alt: 'HP Envy x360', isPrimary: true }
    ],
    specifications: {
      'Display': '15.6" 2.8K OLED Touchscreen',
      'Processor': 'AMD Ryzen 7 7730U',
      'RAM': '16GB DDR4',
      'Storage': '512GB NVMe SSD',
      'Graphics': 'AMD Radeon Graphics',
      'Battery': 'Up to 12 hours'
    },
    highlights: ['360° hinge', 'OLED display', 'HP Pen support', 'Bang & Olufsen audio', 'Fingerprint reader'],
    warranty: '1 Year HP Warranty',
    rating: { average: 4.4, count: 567 },
    badges: [],
    inStock: true,
    createdAt: new Date('2023-07-05'),
    updatedAt: new Date('2026-01-16')
  },
  {
    id: 'prod_019',
    sku: 'BW-LG-TV43-4K',
    name: 'LG 43" 4K UHD Smart TV',
    slug: 'lg-43-4k-uhd-smart-tv',
    description: 'Affordable 4K Smart TV with AI ThinQ, Active HDR, and webOS entertainment platform.',
    shortDescription: '4K UHD, AI ThinQ, webOS',
    categoryId: 'cat_003',
    brandId: 'brand_004',
    price: 32990,
    mrp: 44990,
    discount: 27,
    stock: 67,
    images: [
      { url: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800', alt: 'LG 43" 4K TV', isPrimary: true }
    ],
    specifications: {
      'Display': '43" IPS 4K UHD',
      'Resolution': '3840 x 2160',
      'Processor': 'α5 AI Processor',
      'HDR': 'Active HDR (HDR10, HLG)',
      'Audio': 'AI Sound',
      'Smart TV': 'webOS 23'
    },
    highlights: ['AI ThinQ', 'Game Optimizer', 'Filmmaker Mode', 'Magic Remote', 'AirPlay 2'],
    warranty: '1 Year LG Warranty',
    rating: { average: 4.3, count: 1876 },
    badges: ['sale'],
    inStock: true,
    createdAt: new Date('2023-05-12'),
    updatedAt: new Date('2026-01-18')
  },
  {
    id: 'prod_020',
    sku: 'BW-APP-IPAD-AIR',
    name: 'iPad Air M2 256GB WiFi',
    slug: 'ipad-air-m2-256gb-wifi',
    description: 'Powerful and versatile iPad with M2 chip, 10.9" Liquid Retina display, and Apple Pencil support.',
    shortDescription: 'M2 Chip, 10.9" Display, USB-C',
    categoryId: 'cat_002',
    brandId: 'brand_001',
    price: 69900,
    mrp: 79900,
    discount: 13,
    stock: 54,
    images: [
      { url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800', alt: 'iPad Air M2', isPrimary: true }
    ],
    specifications: {
      'Display': '10.9" Liquid Retina',
      'Chip': 'Apple M2',
      'Storage': '256GB',
      'Camera': '12MP Wide, 12MP Ultra Wide front',
      'Connectivity': 'WiFi 6E, Bluetooth 5.3',
      'Battery': 'Up to 10 hours'
    },
    highlights: ['M2 chip', 'Touch ID', 'USB-C', 'Apple Pencil 2 support', 'Magic Keyboard compatible'],
    warranty: '1 Year Apple Warranty',
    rating: { average: 4.7, count: 1234 },
    badges: ['new'],
    inStock: true,
    createdAt: new Date('2024-03-13'),
    updatedAt: new Date('2026-01-20')
  }
];

// ==================== COUPONS ====================
export const coupons: Coupon[] = [
  {
    id: 'coupon_001',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrderValue: 999,
    maxDiscount: 1000,
    validFrom: new Date('2026-01-01'),
    validTo: new Date('2026-12-31'),
    usageLimit: 1,
    isActive: true
  },
  {
    id: 'coupon_002',
    code: 'FLAT500',
    type: 'fixed',
    value: 500,
    minOrderValue: 4999,
    maxDiscount: 500,
    validFrom: new Date('2026-01-01'),
    validTo: new Date('2026-03-31'),
    usageLimit: 5,
    isActive: true
  },
  {
    id: 'coupon_003',
    code: 'ELECTRONICS15',
    type: 'percentage',
    value: 15,
    minOrderValue: 9999,
    maxDiscount: 5000,
    validFrom: new Date('2026-01-01'),
    validTo: new Date('2026-06-30'),
    usageLimit: 3,
    isActive: true
  },
  {
    id: 'coupon_004',
    code: 'NEWYEAR2026',
    type: 'percentage',
    value: 20,
    minOrderValue: 14999,
    maxDiscount: 10000,
    validFrom: new Date('2026-01-01'),
    validTo: new Date('2026-01-31'),
    usageLimit: 2,
    isActive: true
  }
];

// ==================== IN-MEMORY STORES ====================
// ==================== IN-MEMORY STORES ====================
// Define User interface locally since AuthUser doesn't match
interface DBUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export let users: DBUser[] = [];
export let orders: Order[] = [];
export let walletTransactions: WalletTransaction[] = [];
export let carts: Map<string, CartItem[]> = new Map();
export let wishlists: Map<string, string[]> = new Map();
export let addresses: Map<string, Address[]> = new Map();
export let walletBalances: Map<string, number> = new Map();
export let sessions: Map<string, { userId: string; expiresAt: Date }> = new Map();

// ==================== HELPER FUNCTIONS ====================
export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function generateOrderId(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `BW-ORD-${dateStr}${random}`;
}

export function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export function findUserByEmail(email: string): DBUser | undefined {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(userId: string): DBUser | undefined {
  return users.find(u => u.id === userId);
}

export function findProductById(productId: string): DBProduct | undefined {
  return products.find(p => p.id === productId);
}

export function findCategoryById(categoryId: string): Category | undefined {
  return categories.find(c => c.id === categoryId);
}

export function findBrandById(brandId: string): Brand | undefined {
  return brands.find(b => b.id === brandId);
}

export function validateSession(token: string): { userId: string } | null {
  const session = sessions.get(token);
  if (!session) return null;
  if (new Date() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }
  return { userId: session.userId };
}

export function createSession(userId: string): string {
  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days
  sessions.set(token, { userId, expiresAt });
  return token;
}

export { DBProduct, DBUser, DBCoupon };
