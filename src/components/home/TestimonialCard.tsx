import { Star } from 'lucide-react'

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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">Verified Buyer</p>
        </div>
      </div>
      
      <div className="flex items-center gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < testimonial.rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      <p className="text-gray-600 mb-4">{testimonial.comment}</p>
      
      <p className="text-sm text-gray-400">
        Purchased: <span className="text-gray-600">{testimonial.product}</span>
      </p>
    </div>
  )
}
