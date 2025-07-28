"use client"

import Image from "next/image"
import { ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "🍃 Jogo adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
      className: "bg-slate-800 border-blue-500 text-blue-100",
    })
  }

  return (
    <Card className="gaming-card overflow-hidden hover:scale-105 transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={
            product.image ||
            `/placeholder.svg?height=256&width=300&query=${encodeURIComponent(product.name + " game cover art")}`
          }
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={product.id <= 6}
        />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {product.category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-4 bg-gradient-to-b from-slate-800 to-slate-900">
        <h3 className="font-bold text-lg mb-2 text-blue-100 line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
        <p className="text-slate-300 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">{product.description}</p>

        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
          ))}
          <span className="text-slate-400 text-sm ml-2">(4.8)</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            R$ {product.price.toFixed(2)}
          </p>
          <span className="text-slate-400 text-sm line-through">R$ {(product.price * 1.3).toFixed(2)}</span>
        </div>

        <div className="text-xs text-green-400 font-semibold mb-2">
          💰 Economize R$ {(product.price * 1.3 - product.price).toFixed(2)}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 bg-slate-900">
        <Button onClick={handleAddToCart} className="w-full gaming-button text-white font-semibold" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  )
}
