import { Star, Quote } from 'lucide-react'

interface Testimonial {
  name: string
  avatar: string
  rating: number
  comment: string
  product: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-100 transition-all duration-300 group relative overflow-hidden">
      {/* Decorative quote icon */}
      <Quote className="absolute -top-2 -right-2 h-20 w-20 text-primary-50 group-hover:text-primary-100 transition-colors" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {testimonial.avatar}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-sm text-primary-600 font-medium">Verified Buyer ✓</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < testimonial.rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-200'
              }`}
            />
          ))}
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed italic">"{testimonial.comment}"</p>
        
        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Purchased: <span className="text-gray-700 font-medium">{testimonial.product}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
