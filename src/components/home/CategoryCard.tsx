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
      <div className="relative overflow-hidden rounded-2xl aspect-square bg-gray-100">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-semibold text-white text-lg">{category.name}</h3>
          <p className="text-sm text-gray-300">{category.count}+ Products</p>
        </div>
      </div>
    </Link>
  )
}
