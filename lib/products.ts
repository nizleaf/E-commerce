import { db } from "./database"

export async function getProducts(category?: string, search?: string) {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100))
  return db.getProducts(category, search)
}
