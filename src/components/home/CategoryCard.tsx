import Link from 'next/link'

interface Category {
  name: string
  image: string
  count: number
  href: string
}

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={category.href} className="group">
      <div className="relative overflow-hidden rounded-2xl aspect-square bg-gray-100 hover-lift">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-primary-900/80 transition-colors duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 transform group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-semibold text-white text-lg group-hover:text-primary-200 transition-colors">{category.name}</h3>
          <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{category.count}+ Products</p>
          <div className="h-0.5 w-0 bg-primary-400 mt-2 group-hover:w-full transition-all duration-300 ease-out"></div>
        </div>
      </div>
    </Link>
  )
}
