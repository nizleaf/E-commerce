import ProductCard from "./ProductCard"
import type { Product } from "@/lib/types"

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎮</div>
        <p className="text-slate-400 text-lg mb-6">Nenhum jogo encontrado.</p>
        <p className="text-slate-500">Tente ajustar os filtros ou buscar por outro termo.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
