"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter } from "lucide-react"

const categories = ["Todos", "PlayStation 5", "Xbox Series", "Nintendo Switch", "PC Games", "Acessórios", "Retro Games"]

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "Todos")

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (search) params.set("search", search)
    if (selectedCategory && selectedCategory !== "Todos") {
      params.set("category", selectedCategory)
    }

    router.push(`/?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch("")
    setSelectedCategory("Todos")
    router.push("/")
  }

  return (
    <Card className="gaming-card">
      <CardHeader>
        <CardTitle className="text-blue-100 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-blue-400" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="search" className="text-blue-200 font-medium">
            Buscar jogos
          </Label>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="search"
              placeholder="Digite o nome do jogo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && applyFilters()}
              className="pl-10 bg-slate-800 border-slate-600 text-blue-100 placeholder-slate-400 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <Label className="text-blue-200 font-medium">Plataforma</Label>
          <div className="space-y-3 mt-3">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-blue-500 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-slate-300 group-hover:text-blue-300 transition-colors">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={applyFilters} className="w-full gaming-button text-white font-semibold">
            Aplicar Filtros
          </Button>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-blue-300 bg-transparent"
          >
            Limpar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
