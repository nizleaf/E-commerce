"use client"

import Link from "next/link"
import { ShoppingCart, User, LogOut, Settings } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const { items } = useCart()
  const { user, logout } = useAuth()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-slate-900 border-b border-slate-700 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-3xl">🍃</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Leaf Store
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button
                variant="outline"
                size="sm"
                className="gaming-button border-blue-500 text-white hover:bg-blue-600 bg-transparent"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Carrinho
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500 text-blue-200 hover:bg-blue-800 bg-transparent"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-600">
                  {user.isAdmin && (
                    <DropdownMenuItem asChild className="text-blue-200 hover:bg-slate-700">
                      <Link href="/admin">
                        <Settings className="h-4 w-4 mr-2" />
                        Administração
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout} className="text-blue-200 hover:bg-slate-700">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-x-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-blue-500 text-blue-200 hover:bg-blue-800 bg-transparent"
                >
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button asChild size="sm" className="gaming-button">
                  <Link href="/register">Cadastrar</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
