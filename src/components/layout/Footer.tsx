import Link from 'next/link'
import { 
  Zap, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck
} from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'Televisions', href: '/products?category=televisions' },
    { name: 'Laptops', href: '/products?category=laptops' },
    { name: 'Smartphones', href: '/products?category=smartphones' },
    { name: 'Audio', href: '/products?category=audio' },
    { name: 'Deals', href: '/deals' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'Returns & Refunds', href: '/returns' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Warranty', href: '/warranty' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Partner with Us', href: '/partner' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary-400" />
              </div>
              <div>
                <h4 className="font-medium text-white">Free Delivery</h4>
                <p className="text-sm text-gray-400">On orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-white">Secure Payments</h4>
                <p className="text-sm text-gray-400">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="font-medium text-white">Easy Returns</h4>
                <p className="text-sm text-gray-400">7-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo & About */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-white">BYTEWISE</h2>
                <p className="text-xs text-gray-400 -mt-1">Electronics</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4 max-w-xs">
              Your one-stop destination for premium electronics. Quality products, 
              competitive prices, and exceptional service.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-primary-400" />
                <span className="text-sm">
                  BYTEWISE CONSULTING LLP<br />
                  Mumbai, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <a href="tel:+919876543210" className="text-sm hover:text-primary-400">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <a href="mailto:support@bytewise.store" className="text-sm hover:text-primary-400">
                  support@bytewise.store
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2026 BYTEWISE CONSULTING LLP. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
