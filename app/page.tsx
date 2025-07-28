import { Suspense } from "react"
import ProductList from "@/components/ProductList"
import ProductFilters from "@/components/ProductFilters"
import { getProducts } from "@/lib/products"

export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string }
}) {
  const products = await getProducts(searchParams.category, searchParams.search)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">
            🍃 Leaf Store
          </h1>
          <p className="text-blue-200 text-lg">Os melhores jogos e acessórios para gamers</p>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters />
          </div>

          <div className="lg:col-span-3">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
                </div>
              }
            >
              <ProductList products={products} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
