-- ====================================
-- TABLAS PRINCIPALES
-- ====================================

-- 1. personal_info (Información personal)
CREATE TABLE personal_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  email TEXT,
  avatar_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  resume_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. projects (Proyectos)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  technologies TEXT[], -- Array de strings
  category TEXT NOT NULL CHECK (category IN ('frontend', 'fullstack', 'backend', 'mobile')),
  github_url TEXT,
  live_url TEXT,
  demo_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. skills (Habilidades)
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'tools', 'other')),
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  icon_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. blog_posts (Posts del blog)
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  tags TEXT[],
  reading_time INTEGER,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. contact_messages (Mensajes del formulario de contacto)
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. site_analytics (Analytics del sitio)
CREATE TABLE site_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  visitor_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  visited_at TIMESTAMPTZ DEFAULT now()
);

-- ====================================
-- ÍNDICES
-- ====================================
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_order ON projects(display_order);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX idx_messages_created ON contact_messages(created_at DESC);
CREATE INDEX idx_analytics_visited ON site_analytics(visited_at DESC);

-- ====================================
-- TRIGGERS PARA UPDATED_AT
-- ====================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_personal_info_updated_at BEFORE UPDATE ON personal_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================
-- RLS POLICIES (Lectura pública básica)
-- ====================================
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Allow public read published projects" ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read published posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public insert contact" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert analytics" ON site_analytics FOR INSERT WITH CHECK (true);

-- ====================================
-- FUNCIONES RPC (Lógica de Negocio)
-- ====================================

-- 1. Incrementar vistas de proyecto
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE projects
  SET views_count = views_count + 1
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Incrementar vistas de blog post
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts
  SET views_count = views_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Obtener estadísticas globales del sitio
CREATE OR REPLACE FUNCTION get_site_stats()
RETURNS TABLE (
  total_visits BIGINT,
  unique_visitors BIGINT,
  today_visits BIGINT,
  this_week_visits BIGINT,
  this_month_visits BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_visits,
    COUNT(DISTINCT visitor_id)::BIGINT as unique_visitors,
    COUNT(*) FILTER (WHERE visited_at >= CURRENT_DATE)::BIGINT as today_visits,
    COUNT(*) FILTER (WHERE visited_at >= CURRENT_DATE - INTERVAL '7 days')::BIGINT as this_week_visits,
    COUNT(*) FILTER (WHERE visited_at >= CURRENT_DATE - INTERVAL '30 days')::BIGINT as this_month_visits
  FROM site_analytics;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
