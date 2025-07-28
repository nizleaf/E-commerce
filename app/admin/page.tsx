"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"
import { Pencil, Trash2, Plus } from "lucide-react"
import Image from "next/image"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  })

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/")
      return
    }
    fetchProducts()
  }, [user, router])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      toast({
        title: "❌ Erro",
        description: "Erro ao carregar produtos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      ...formData,
      price: Number.parseFloat(formData.price),
    }

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products"
      const method = editingProduct ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        toast({
          title: "🍃 Sucesso!",
          description: editingProduct ? "Jogo atualizado com sucesso" : "Jogo adicionado com sucesso",
          className: "bg-slate-800 border-blue-500 text-blue-100",
        })

        resetForm()
        fetchProducts()
      } else {
        throw new Error("Erro na operação")
      }
    } catch (error) {
      toast({
        title: "❌ Erro",
        description: "Erro ao salvar produto",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este jogo?")) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "🍃 Sucesso!",
          description: "Jogo excluído com sucesso",
          className: "bg-slate-800 border-blue-500 text-blue-100",
        })
        fetchProducts()
      } else {
        throw new Error("Erro ao excluir")
      }
    } catch (error) {
      toast({
        title: "❌ Erro",
        description: "Erro ao excluir produto",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">❌ Acesso Negado</h1>
          <p className="text-slate-400">Você não tem permissão para acessar esta área.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">🍃</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Leaf Store - Administração
            </h1>
          </div>
          <Button onClick={() => setShowForm(true)} className="gaming-button text-white font-semibold">
            <Plus className="h-4 w-4 mr-2" />
            Novo Jogo
          </Button>
        </div>

        {showForm && (
          <Card className="gaming-card mb-8">
            <CardHeader>
              <CardTitle className="text-blue-100 text-xl">{editingProduct ? "Editar Jogo" : "Novo Jogo"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-blue-200 font-medium">
                    Nome do Jogo
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-600 text-blue-100 focus:border-blue-500"
                    placeholder="Ex: The Last of Us Part II"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-blue-200 font-medium">
                    Descrição
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-600 text-blue-100 focus:border-blue-500"
                    placeholder="Descreva o jogo..."
                  />
                </div>

                <div>
                  <Label htmlFor="price" className="text-blue-200 font-medium">
                    Preço (R$)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-600 text-blue-100 focus:border-blue-500"
                    placeholder="199.99"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-blue-200 font-medium">
                    Plataforma
                  </Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full bg-slate-800 border border-slate-600 text-blue-100 rounded-md px-3 py-2 focus:border-blue-500"
                  >
                    <option value="">Selecione uma plataforma</option>
                    <option value="PlayStation 5">PlayStation 5</option>
                    <option value="Xbox Series">Xbox Series</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                    <option value="PC Games">PC Games</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Retro Games">Retro Games</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="image" className="text-blue-200 font-medium">
                    URL da Imagem
                  </Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="bg-slate-800 border-slate-600 text-blue-100 focus:border-blue-500"
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button type="submit" className="gaming-button text-white font-semibold">
                    {editingProduct ? "Atualizar" : "Criar"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="gaming-card">
              <CardContent className="p-6">
                <div className="relative h-32 w-full mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={
                      product.image || `/placeholder.svg?height=128&width=200&query=${encodeURIComponent(product.name)}`
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <h3 className="font-bold text-lg text-blue-100 mb-2">{product.name}</h3>
                <p className="text-slate-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                <p className="text-sm text-slate-500 mb-2">Plataforma: {product.category}</p>
                <p className="font-bold text-xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  R$ {product.price.toFixed(2)}
                </p>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(product)}
                    className="border-blue-500 text-blue-300 hover:bg-blue-800"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
