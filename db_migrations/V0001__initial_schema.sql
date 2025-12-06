CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  site_title VARCHAR(255) NOT NULL DEFAULT 'NEXUSWORLD',
  site_description TEXT,
  discord_link VARCHAR(500),
  telegram_link VARCHAR(500),
  youtube_link VARCHAR(500),
  email VARCHAR(255),
  server_ip VARCHAR(255) NOT NULL DEFAULT 'NexusWorld.joinserver.ru',
  theme VARCHAR(50) NOT NULL DEFAULT 'default',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS donation_packages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  features JSONB NOT NULL,
  color_from VARCHAR(50) NOT NULL,
  color_to VARCHAR(50) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS donation_transactions (
  id SERIAL PRIMARY KEY,
  package_id INTEGER REFERENCES donation_packages(id),
  minecraft_nickname VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  amount INTEGER NOT NULL,
  card_number VARCHAR(4),
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

INSERT INTO site_settings (site_title, site_description, telegram_link, youtube_link, email, server_ip, theme) 
VALUES (
  'NEXUSWORLD', 
  'Легендарный сервер с уникальными режимами игры и активным комьюнити',
  'https://t.me/NexusWorldTM',
  'https://www.youtube.com/@NexusWorldTM',
  'alek.efremov@icloud.com',
  'NexusWorld.joinserver.ru',
  'default'
);

INSERT INTO donation_packages (name, price, description, features, color_from, color_to, sort_order, is_popular) VALUES
('НОВИЧОК', 99, 'Идеально для старта', '["Префикс [НОВИЧОК]", "Цветной ник", "2 приватных региона", "Доступ к /hat"]', 'gray-500', 'slate-600', 1, false),
('VIP', 199, 'Базовая привилегия', '["Префикс [VIP]", "Доступ к /fly", "5 приватных регионов", "Цветной ник", "Набор ресурсов"]', 'green-500', 'emerald-600', 2, false),
('PREMIUM', 399, 'Популярный выбор', '["Префикс [PREMIUM]", "Команды /fly, /god", "10 регионов", "Эффекты", "Приоритет входа", "Кит ресурсов"]', 'blue-500', 'cyan-600', 3, true),
('ELITE', 599, 'Для продвинутых', '["Префикс [ELITE]", "Все команды VIP", "15 регионов", "Уникальные эффекты", "Приоритет 2", "Доступ к эксклюзивным мирам"]', 'purple-500', 'violet-600', 4, false),
('LEGEND', 799, 'Легендарный статус', '["Префикс [LEGEND]", "Все команды", "25 регионов", "Эксклюзив", "VIP очередь", "Особые привилегии"]', 'orange-500', 'amber-600', 5, false),
('TITAN', 1299, 'Максимальная мощь', '["Префикс [TITAN]", "ВСЕ возможности", "Без ограничений", "Личный мир", "Максимальный приоритет", "Уникальные способности"]', 'red-500', 'pink-600', 6, false);
