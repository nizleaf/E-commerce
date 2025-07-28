import type { Product, User } from "./types"

// Banco de dados simulado com jogos de videogame e imagens reais
const products: Product[] = [
  {
    id: 1,
    name: "The Last of Us Part II",
    description: "Aventura pós-apocalíptica emocionante com gráficos impressionantes e narrativa envolvente",
    price: 199.99,
    category: "PlayStation 5",
    image: "/images/the-last-of-us-2.png",
  },
  {
    id: 2,
    name: "Halo Infinite",
    description: "O retorno épico do Master Chief em uma aventura espacial de tirar o fôlego",
    price: 249.99,
    category: "Xbox Series",
    image: "/images/halo-infinite.png",
  },
  {
    id: 3,
    name: "Super Mario Odyssey",
    description: "Aventura mágica do Mario em mundos incríveis com mecânicas inovadoras",
    price: 299.99,
    category: "Nintendo Switch",
    image: "/images/mario-odyssey.png",
  },
  {
    id: 4,
    name: "Cyberpunk 2077",
    description: "RPG futurístico em Night City com escolhas que moldam seu destino",
    price: 159.99,
    category: "PC Games",
    image: "/images/cyberpunk-2077.png",
  },
  {
    id: 5,
    name: "God of War Ragnarök",
    description: "A jornada épica de Kratos e Atreus pelos nove reinos nórdicos",
    price: 279.99,
    category: "PlayStation 5",
    image: "/images/god-of-war-ragnarok.png",
  },
  {
    id: 6,
    name: "Forza Horizon 5",
    description: "Corridas espetaculares no México com carros incríveis e mundo aberto",
    price: 229.99,
    category: "Xbox Series",
    image: "/images/forza-horizon-5.png",
  },
  {
    id: 7,
    name: "The Legend of Zelda: Breath of the Wild",
    description: "Aventura épica em Hyrule com liberdade total de exploração",
    price: 319.99,
    category: "Nintendo Switch",
    image: "/images/zelda-breath-wild.png",
  },
  {
    id: 8,
    name: "Elden Ring",
    description: "RPG de ação desafiador criado por FromSoftware e George R.R. Martin",
    price: 199.99,
    category: "PC Games",
    image: "/images/elden-ring.png",
  },
  {
    id: 9,
    name: "Controle DualSense PS5",
    description: "Controle oficial PlayStation 5 com feedback háptico e gatilhos adaptativos",
    price: 399.99,
    category: "Acessórios",
    image: "/images/dualsense-controller.png",
  },
  {
    id: 10,
    name: "Super Metroid",
    description: "Clássico jogo de plataforma e exploração espacial da era 16-bits",
    price: 89.99,
    category: "Retro Games",
    image: "/images/super-metroid.png",
  },
  {
    id: 11,
    name: "FIFA 24",
    description: "O simulador de futebol mais realista com times e jogadores atualizados",
    price: 299.99,
    category: "PlayStation 5",
    image: "/images/fifa-24.png",
  },
  {
    id: 12,
    name: "Headset Gamer RGB",
    description: "Headset profissional com som surround 7.1 e iluminação RGB customizável",
    price: 299.99,
    category: "Acessórios",
    image: "/images/gaming-headset.png",
  },
]

const users: User[] = [
  {
    id: 1,
    name: "Admin Leaf",
    email: "admin@leafstore.com",
    password: "$2b$10$rQZ8kHWiZ8.vZ8kHWiZ8.uOYl7Z8kHWiZ8.uOYl7Z8k", // senha: admin123
    isAdmin: true,
  },
]

let nextProductId = 13
let nextUserId = 2

export const db = {
  // Products
  getProducts: (category?: string, search?: string) => {
    let filtered = products

    if (category && category !== "Todos") {
      filtered = filtered.filter((p) => p.category === category)
    }

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    return filtered
  },

  getProductById: (id: number) => {
    return products.find((p) => p.id === id)
  },

  createProduct: (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: nextProductId++ }
    products.push(newProduct)
    return newProduct
  },

  updateProduct: (id: number, updates: Partial<Product>) => {
    const index = products.findIndex((p) => p.id === id)
    if (index !== -1) {
      products[index] = { ...products[index], ...updates }
      return products[index]
    }
    return null
  },

  deleteProduct: (id: number) => {
    const index = products.findIndex((p) => p.id === id)
    if (index !== -1) {
      products.splice(index, 1)
      return true
    }
    return false
  },

  // Users
  getUserByEmail: (email: string) => {
    return users.find((u) => u.email === email)
  },

  createUser: (user: Omit<User, "id">) => {
    const newUser = { ...user, id: nextUserId++ }
    users.push(newUser)
    return newUser
  },

  getUserById: (id: number) => {
    return users.find((u) => u.id === id)
  },
}
