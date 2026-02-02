// Load environment variables FIRST - this MUST be before any imports
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// Debug: Check if MONGODB_URI is loaded
console.log('Environment check:', {
  MONGODB_URI: process.env.MONGODB_URI ? 'Loaded ✓' : 'Missing ✗',
  NODE_ENV: process.env.NODE_ENV
});

// Now we can use ES6 imports
import mongoose from 'mongoose';
import connectDB from '../src/lib/mongodb';
import User from '../src/models/User';
import Product from '../src/models/Product';
import Category from '../src/models/Category';
import Brand from '../src/models/Brand';
import Coupon from '../src/models/Coupon';
import bcrypt from 'bcryptjs';

const categories = [
  {
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Latest smartphones and mobile devices',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    productCount: 45
  },
  {
    name: 'Laptops',
    slug: 'laptops',
    description: 'High-performance laptops and notebooks',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    productCount: 32
  },
  {
    name: 'TVs',
    slug: 'tvs',
    description: 'Smart TVs and home entertainment',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
    productCount: 28
  },
  {
    name: 'Audio',
    slug: 'audio',
    description: 'Headphones, speakers, and sound systems',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    productCount: 67
  },
  {
    name: 'Wearables',
    slug: 'wearables',
    description: 'Smartwatches and fitness trackers',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    productCount: 41
  },
  {
    name: 'Gaming',
    slug: 'gaming',
    description: 'Gaming consoles and accessories',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800',
    productCount: 24
  },
  {
    name: 'Cameras',
    slug: 'cameras',
    description: 'Digital cameras and photography gear',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    productCount: 19
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Cables, chargers, and more',
    image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=800',
    productCount: 87
  }
];

const brands = [
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png', slug: 'apple' },
  { name: 'Samsung', logo: 'https://images.unsplash.com/photo-1587817229766-43c2e826ad68?w=200', slug: 'samsung' },
  { name: 'Sony', logo: 'https://images.unsplash.com/photo-1617945813375-7b55a6b0b1a4?w=200', slug: 'sony' },
  { name: 'LG', logo: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=200', slug: 'lg' },
  { name: 'Dell', logo: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200', slug: 'dell' },
  { name: 'HP', logo: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=200', slug: 'hp' },
  { name: 'OnePlus', logo: 'https://images.unsplash.com/photo-1609692814857-2a55c17e09e5?w=200', slug: 'oneplus' },
  { name: 'JBL', logo: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200', slug: 'jbl' },
  { name: 'Bose', logo: 'https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?w=200', slug: 'bose' },
  { name: 'Canon', logo: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200', slug: 'canon' }
];

const coupons = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrderValue: 999,
    maxDiscount: 1000,
    validFrom: new Date('2026-01-01'),
    validTo: new Date('2026-12-31'),
    usageLimit: 1,
    usedCount: 0,
    isActive: true
  },
  {
    code: 'FLAT500',
    type: 'fixed',
    value: 500,
    minOrderValue: 4999,
    maxDiscount: 500,
    validFrom: new Date('2026-01-01'),
    validTo: new Date('2026-03-31'),
    usageLimit: 5,
    usedCount: 0,
    isActive: true
  },
  {
    code: 'ELECTRONICS15',
    type: 'percentage',
    value: 15,
    minOrderValue: 9999,
    maxDiscount: 5000,
    validFrom: new Date('2026-01-01'),
    validTo: new Date('2026-06-30'),
    usageLimit: 3,
    usedCount: 0,
    isActive: true
  },
  {
    code: 'NEWYEAR2026',
    type: 'percentage',
    value: 20,
    minOrderValue: 14999,
    maxDiscount: 10000,
    validFrom: new Date('2026-01-01'),
    validTo: new Date('2026-01-31'),
    usageLimit: 2,
    usedCount: 0,
    isActive: true
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectDB();

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Category.deleteMany({}),
      Brand.deleteMany({}),
      Coupon.deleteMany({})
    ]);

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@bytewise.com',
      phone: '+919876543210',
      password: adminPassword,
      role: 'admin',
      isEmailVerified: true,
      isPhoneVerified: true
    });
    console.log(`✅ Admin created: ${admin.email} / admin123`);

    // Create test user
    console.log('👤 Creating test user...');
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await User.create({
      name: 'Test User',
      email: 'user@bytewise.com',
      phone: '+919876543211',
      password: userPassword,
      role: 'user',
      isEmailVerified: true,
      isPhoneVerified: false
    });
    console.log(`✅ User created: ${user.email} / user123`);

    // Insert categories
    console.log('📦 Inserting categories...');
    const insertedCategories = await Category.insertMany(categories);
    console.log(`✅ ${insertedCategories.length} categories inserted`);

    // Insert brands
    console.log('🏷️  Inserting brands...');
    const insertedBrands = await Brand.insertMany(brands);
    console.log(`✅ ${insertedBrands.length} brands inserted`);

    // Get category and brand IDs
    const smartphonesCategory = insertedCategories.find(c => c.slug === 'smartphones');
    const laptopsCategory = insertedCategories.find(c => c.slug === 'laptops');
    const tvsCategory = insertedCategories.find(c => c.slug === 'tvs');
    const audioCategory = insertedCategories.find(c => c.slug === 'audio');
    
    const appleBrand = insertedBrands.find(b => b.slug === 'apple');
    const samsungBrand = insertedBrands.find(b => b.slug === 'samsung');
    const sonyBrand = insertedBrands.find(b => b.slug === 'sony');
    const oneplusBrand = insertedBrands.find(b => b.slug === 'oneplus');

    // Insert sample products
    console.log('📱 Inserting products...');
    const products = [
      {
        sku: 'BW-IPH-15PRO-256',
        name: 'iPhone 15 Pro Max 256GB',
        slug: 'iphone-15-pro-max-256gb',
        description: 'The most powerful iPhone ever with A17 Pro chip, titanium design, and Action button.',
        shortDescription: 'A17 Pro chip, Titanium Design, 48MP Camera',
        categoryId: smartphonesCategory?._id.toString(),
        brandId: appleBrand?._id.toString(),
        price: 134900,
        mrp: 159900,
        discount: 16,
        stock: 45,
        images: [
          { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', alt: 'iPhone 15 Pro Max', isPrimary: true }
        ],
        specifications: {
          'Display': '6.7" Super Retina XDR OLED',
          'Processor': 'A17 Pro Chip',
          'RAM': '8GB',
          'Storage': '256GB',
          'Camera': '48MP + 12MP + 12MP'
        },
        highlights: ['A17 Pro chip', 'Titanium design', 'Action button', '48MP camera'],
        warranty: '1 Year Apple Warranty',
        rating: { average: 4.8, count: 2340 },
        badges: ['bestseller', 'premium'],
        inStock: true
      },
      {
        sku: 'BW-SAM-S24U-256',
        name: 'Samsung Galaxy S24 Ultra 256GB',
        slug: 'samsung-galaxy-s24-ultra-256gb',
        description: 'Galaxy AI powered flagship with built-in S Pen and 200MP camera.',
        shortDescription: 'Galaxy AI, 200MP Camera, S Pen',
        categoryId: smartphonesCategory?._id.toString(),
        brandId: samsungBrand?._id.toString(),
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
          'Camera': '200MP + 12MP + 50MP + 10MP'
        },
        highlights: ['Galaxy AI', 'S Pen', '200MP camera', 'Titanium frame'],
        warranty: '1 Year Samsung Warranty',
        rating: { average: 4.7, count: 1890 },
        badges: ['new'],
        inStock: true
      },
      {
        sku: 'BW-MBP-14-M3PRO',
        name: 'MacBook Pro 14" M3 Pro 512GB',
        slug: 'macbook-pro-14-m3-pro',
        description: 'Supercharged by M3 Pro chip with 18 hours battery life.',
        shortDescription: 'M3 Pro, 18hr Battery, XDR Display',
        categoryId: laptopsCategory?._id.toString(),
        brandId: appleBrand?._id.toString(),
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
          'RAM': '18GB',
          'Storage': '512GB SSD'
        },
        highlights: ['M3 Pro chip', 'XDR display', '18hr battery', 'MagSafe'],
        warranty: '1 Year Apple Warranty',
        rating: { average: 4.9, count: 876 },
        badges: ['premium'],
        inStock: true
      },
      {
        sku: 'BW-SONY-TV65-OLED',
        name: 'Sony 65" 4K OLED Bravia XR',
        slug: 'sony-65-4k-oled-bravia-xr',
        description: 'Premium OLED with Cognitive Processor XR and perfect blacks.',
        shortDescription: 'OLED 4K, Cognitive XR, Perfect Blacks',
        categoryId: tvsCategory?._id.toString(),
        brandId: sonyBrand?._id.toString(),
        price: 189990,
        mrp: 219900,
        discount: 14,
        stock: 18,
        images: [
          { url: 'https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=800', alt: 'Sony OLED TV', isPrimary: true }
        ],
        specifications: {
          'Display': '65" OLED 4K',
          'Processor': 'Cognitive Processor XR',
          'HDR': 'Dolby Vision, HDR10'
        },
        highlights: ['Perfect blacks', 'XR Triluminos Pro', 'BRAVIA Core'],
        warranty: '3 Years Sony Warranty',
        rating: { average: 4.8, count: 567 },
        badges: ['premium'],
        inStock: true
      },
      {
        sku: 'BW-SONY-WH1000XM5',
        name: 'Sony WH-1000XM5 Wireless',
        slug: 'sony-wh-1000xm5-wireless',
        description: 'Industry-leading noise cancellation with 30-hour battery.',
        shortDescription: 'Best-in-class ANC, 30hr Battery',
        categoryId: audioCategory?._id.toString(),
        brandId: sonyBrand?._id.toString(),
        price: 26990,
        mrp: 34990,
        discount: 23,
        stock: 89,
        images: [
          { url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800', alt: 'Sony WH-1000XM5', isPrimary: true }
        ],
        specifications: {
          'Type': 'Over-ear Headphones',
          'ANC': 'HD Noise Cancellation',
          'Battery': '30 hours'
        },
        highlights: ['Auto NC Optimizer', '360 Reality Audio', 'Speak-to-Chat'],
        warranty: '1 Year Sony Warranty',
        rating: { average: 4.8, count: 4567 },
        badges: ['bestseller'],
        inStock: true
      }
    ];

    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ ${insertedProducts.length} products inserted`);

    // Insert coupons
    console.log('🎟️  Inserting coupons...');
    const insertedCoupons = await Coupon.insertMany(coupons);
    console.log(`✅ ${insertedCoupons.length} coupons inserted`);

    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('📝 Login Credentials:');
    console.log('   Admin: admin@bytewise.com / admin123');
    console.log('   User:  user@bytewise.com / user123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
