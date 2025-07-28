"use client"

import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-24 w-24 text-slate-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-blue-100 mb-4">Seu carrinho está vazio</h1>
            <p className="text-slate-400 mb-8 text-lg">Que tal adicionar alguns jogos incríveis?</p>
            <Button asChild className="gaming-button text-white font-semibold px-8 py-3">
              <Link href="/">🍃 Explorar Jogos</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-8 text-center">
          🛒 Carrinho da Leaf Store
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="gaming-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative h-32 w-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          item.image ||
                          `/placeholder.svg?height=128&width=96&query=${encodeURIComponent(item.name + " game cover")}`
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-blue-100 mb-1">{item.name}</h3>
                      <p className="text-slate-400 text-sm mb-2">{item.category}</p>
                      <p className="font-bold text-xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                        R$ {item.price.toFixed(2)}
                      </p>
                      <p className="text-slate-500 text-sm">Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-3 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="w-12 text-center font-bold text-blue-100 text-lg">{item.quantity}</span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="bg-red-600 hover:bg-red-700 h-8 w-8 p-0 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card className="gaming-card sticky top-4">
              <CardHeader>
                <CardTitle className="text-blue-100 text-xl flex items-center">🍃 Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-slate-300">
                      <span>
                        {item.name} (x{item.quantity})
                      </span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-slate-600" />

                <div className="flex justify-between text-slate-300">
                  <span>Subtotal:</span>
                  <span>R$ {getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Frete:</span>
                  <span className="text-green-400 font-semibold">Grátis</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Desconto Gamer:</span>
                  <span className="text-green-400">-R$ 0,00</span>
                </div>
                <hr className="border-slate-600" />
                <div className="flex justify-between font-bold text-xl">
                  <span className="text-blue-100">Total:</span>
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    R$ {getTotal().toFixed(2)}
                  </span>
                </div>

                <div className="bg-slate-800 p-3 rounded-lg border border-slate-600">
                  <p className="text-green-400 text-sm font-semibold mb-1">🎮 Vantagens Leaf Store:</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>• Frete grátis para todo Brasil</li>
                    <li>• Garantia de 30 dias</li>
                    <li>• Suporte gamer 24/7</li>
                  </ul>
                </div>

                <Button className="w-full gaming-button text-white font-bold py-3 text-lg" size="lg">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Finalizar Compra
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                  asChild
                >
                  <Link href="/">🍃 Continuar Comprando</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
