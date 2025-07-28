-- Script para inicializar o banco de dados da GameStore
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

-- Tabela de produtos (jogos)
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
VALUES ('Admin Gamer', 'admin@gamestore.com', '$2b$10$rQZ8kHWiZ8.vZ8kHWiZ8.uOYl7Z8kHWiZ8.vZ8kHWiZ8.uOYl7Z8k', TRUE);

-- Inserir jogos de exemplo
INSERT OR IGNORE INTO products (name, description, price, category, image) VALUES
('The Last of Us Part II', 'Aventura pós-apocalíptica emocionante com gráficos impressionantes e narrativa envolvente', 199.99, 'PlayStation 5', '/placeholder.svg?height=300&width=300'),
('Halo Infinite', 'O retorno épico do Master Chief em uma aventura espacial de tirar o fôlego', 249.99, 'Xbox Series', '/placeholder.svg?height=300&width=300'),
('Super Mario Odyssey', 'Aventura mágica do Mario em mundos incríveis com mecânicas inovadoras', 299.99, 'Nintendo Switch', '/placeholder.svg?height=300&width=300'),
('Cyberpunk 2077', 'RPG futurístico em Night City com escolhas que moldam seu destino', 159.99, 'PC Games', '/placeholder.svg?height=300&width=300'),
('God of War Ragnarök', 'A jornada épica de Kratos e Atreus pelos nove reinos nórdicos', 279.99, 'PlayStation 5', '/placeholder.svg?height=300&width=300'),
('Forza Horizon 5', 'Corridas espetaculares no México com carros incríveis e mundo aberto', 229.99, 'Xbox Series', '/placeholder.svg?height=300&width=300'),
('The Legend of Zelda: Breath of the Wild', 'Aventura épica em Hyrule com liberdade total de exploração', 319.99, 'Nintendo Switch', '/placeholder.svg?height=300&width=300'),
('Elden Ring', 'RPG de ação desafiador criado por FromSoftware e George R.R. Martin', 199.99, 'PC Games', '/placeholder.svg?height=300&width=300'),
('Controle DualSense PS5', 'Controle oficial PlayStation 5 com feedback háptico e gatilhos adaptativos', 399.99, 'Acessórios', '/placeholder.svg?height=300&width=300'),
('Super Metroid', 'Clássico jogo de plataforma e exploração espacial da era 16-bits', 89.99, 'Retro Games', '/placeholder.svg?height=300&width=300'),
('FIFA 24', 'O simulador de futebol mais realista com times e jogadores atualizados', 299.99, 'PlayStation 5', '/placeholder.svg?height=300&width=300'),
('Headset Gamer RGB', 'Headset profissional com som surround 7.1 e iluminação RGB customizável', 299.99, 'Acessórios', '/placeholder.svg?height=300&width=300');
