import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "A senha deve ter pelo menos 6 caracteres" }, { status: 400 })
    }

    // Verificar se o usuário já existe
    const existingUser = db.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 400 })
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar o usuário
    const user = db.createUser({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    })

    // Remover a senha da resposta
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({ message: "Usuário criado com sucesso", user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
