"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Lock } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "❌ Erro no cadastro",
        description: "As senhas não coincidem",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "🍃 Cadastro realizado com sucesso!",
          description: "Bem-vindo à Leaf Store! Você pode fazer login agora.",
          className: "bg-slate-800 border-blue-500 text-blue-100",
        })
        router.push("/login")
      } else {
        toast({
          title: "❌ Erro no cadastro",
          description: data.error || "Erro interno do servidor",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "❌ Erro no cadastro",
        description: "Erro interno do servidor",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="gaming-card">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="text-6xl">🍃</div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Junte-se à Leaf Store
            </CardTitle>
            <p className="text-slate-400">Crie sua conta gamer</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-blue-200 font-medium">
                  Nome Gamer
                </Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-10 bg-slate-800 border-slate-600 text-blue-100 focus:border-blue-500"
                    placeholder="Seu nome"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-blue-200 font-medium">
                  E-mail
                </Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-slate-800 border-slate-600 text-blue-100 focus:border-blue-500"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-blue-200 font-medium">
                  Senha
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-10 bg-slate-800 border-slate-600 text-blue-100 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-blue-200 font-medium">
                  Confirmar Senha
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-10 bg-slate-800 border-slate-600 text-blue-100 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full gaming-button text-white font-bold py-3" disabled={loading}>
                {loading ? "Cadastrando..." : "Criar Conta"}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-slate-400">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
                  Faça login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
