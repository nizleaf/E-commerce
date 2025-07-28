-- Script para inicializar o banco de dados
-- Este script pode ser usado com PostgreSQL, MySQL ou SQLite

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela de itens do pedido
CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Inserir usuário administrador padrão
INSERT OR IGNORE INTO users (name, email, password, is_admin) 
VALUES ('Admin', 'admin@example.com', '$2b$10$rQZ8kHWiZ8.vZ8kHWiZ8.uOYl7Z8kHWiZ8.vZ8kHWiZ8.uOYl7Z8k', TRUE);

-- Inserir produtos de exemplo
INSERT OR IGNORE INTO products (name, description, price, category, image) VALUES
('Smartphone Samsung Galaxy', 'Smartphone com tela de 6.1 polegadas, 128GB de armazenamento', 899.99, 'Eletrônicos', '/placeholder.svg?height=300&width=300'),
('Notebook Dell Inspiron', 'Notebook com processador Intel i5, 8GB RAM, 256GB SSD', 2499.99, 'Eletrônicos', '/placeholder.svg?height=300&width=300'),
('Camiseta Básica', 'Camiseta 100% algodão, disponível em várias cores', 29.99, 'Roupas', '/placeholder.svg?height=300&width=300'),
('Tênis Esportivo', 'Tênis para corrida com tecnologia de amortecimento', 199.99, 'Esportes', '/placeholder.svg?height=300&width=300'),
('Livro: JavaScript Moderno', 'Guia completo para desenvolvimento web com JavaScript', 59.99, 'Livros', '/placeholder.svg?height=300&width=300'),
('Cafeteira Elétrica', 'Cafeteira automática com timer programável', 149.99, 'Casa', '/placeholder.svg?height=300&width=300');
