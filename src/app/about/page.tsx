import Link from 'next/link'
import { 
  Zap, 
  Users, 
  Award, 
  Globe, 
  Shield, 
  Heart,
  Target,
  Lightbulb
} from 'lucide-react'

const stats = [
  { label: 'Happy Customers', value: '50,000+' },
  { label: 'Products', value: '10,000+' },
  { label: 'Cities Served', value: '500+' },
  { label: 'Years of Trust', value: '5+' },
]

const values = [
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'We source only genuine products from authorized distributors and brands.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We go above and beyond to serve you.',
  },
  {
    icon: Target,
    title: 'Best Prices',
    description: 'Competitive pricing with regular discounts and exclusive offers.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Constantly improving our platform to enhance your shopping experience.',
  },
]

const team = [
  { name: 'Rahul Sharma', role: 'Founder & CEO', image: 'RS' },
  { name: 'Priya Patel', role: 'Head of Operations', image: 'PP' },
  { name: 'Amit Kumar', role: 'CTO', image: 'AK' },
  { name: 'Sneha Reddy', role: 'Head of Marketing', image: 'SR' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
            <Zap className="h-4 w-4" />
            <span className="text-sm">About BYTEWISE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Your Trusted Electronics Partner
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            BYTEWISE CONSULTING LLP is committed to bringing you the best electronics 
            at unbeatable prices with exceptional service.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2021, BYTEWISE CONSULTING LLP started with a simple mission: 
                  to make quality electronics accessible to everyone across India.
                </p>
                <p>
                  What began as a small operation has grown into one of the most trusted 
                  online electronics retailers in the country. We partner directly with 
                  top brands to bring you genuine products at competitive prices.
                </p>
                <p>
                  Today, we serve over 50,000 happy customers across 500+ cities, 
                  offering everything from smartphones and laptops to home appliances 
                  and gaming gear.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-primary-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-primary-100">
                  To democratize access to premium electronics by offering the best 
                  products at fair prices, backed by world-class customer service and 
                  a seamless shopping experience.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl -mt-8 ml-8 relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To become India's most trusted and preferred destination for 
                  electronics, setting new standards in e-commerce excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              These core values guide everything we do at BYTEWISE
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The passionate people behind BYTEWISE
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 font-bold text-xl">
                  {member.image}
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Ready to Shop?
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Explore our wide range of electronics and experience the BYTEWISE difference.
          </p>
          <Link href="/products" className="btn bg-white text-primary-700 hover:bg-gray-100">
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  )
}
