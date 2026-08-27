-- AiRA Lab PostgreSQL Schema Definitions

CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(50) PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  author VARCHAR(255) NOT NULL,
  desc_text TEXT NOT NULL,
  img TEXT NOT NULL,
  card_img TEXT,
  tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
  metrics JSONB NOT NULL DEFAULT '{}'::jsonb,
  demo_url TEXT,
  github_url TEXT,
  paper_url TEXT,
  status VARCHAR(50) DEFAULT 'DEPLOYED',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  project_title VARCHAR(255) NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
