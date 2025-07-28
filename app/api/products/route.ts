import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const products = db.getProducts(category || undefined, search || undefined)

    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, category, image } = body

    if (!name || !description || !price || !category) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const product = db.createProduct({
      name,
      description,
      price: Number.parseFloat(price),
      category,
      image: image || undefined,
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 })
  }
}
