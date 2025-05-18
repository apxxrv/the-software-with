-- Insert categories
INSERT INTO categories (id, name, slug, color) VALUES
  (uuid_generate_v4(), 'Guide', 'guide', 'bg-blue-600'),
  (uuid_generate_v4(), 'Interview', 'interview', 'bg-teal-600'),
  (uuid_generate_v4(), 'Analysis', 'analysis', 'bg-indigo-600'),
  (uuid_generate_v4(), 'News', 'news', 'bg-amber-600'),
  (uuid_generate_v4(), 'Tutorial', 'tutorial', 'bg-green-600'),
  (uuid_generate_v4(), 'Tech Talk', 'tech-talk', 'bg-purple-600'),
  (uuid_generate_v4(), 'Panel', 'panel', 'bg-cyan-600');

-- Insert authors
INSERT INTO authors (id, name, slug, role, bio, image_url) VALUES
  (uuid_generate_v4(), 'Sarah Johnson', 'sarah-johnson', 'Senior Tech Writer', 'Sarah is a senior tech writer with over 10 years of experience in the software industry.', '/images/person-1.jpg'),
  (uuid_generate_v4(), 'Michael Roberts', 'michael-roberts', 'Software Engineer', 'Michael is a software engineer specializing in web technologies and cloud architecture.', '/images/person-2.jpg'),
  (uuid_generate_v4(), 'Emily Parker', 'emily-parker', 'AI Researcher', 'Emily is an AI researcher focusing on machine learning applications in software development.', '/images/person-3.jpg'),
  (uuid_generate_v4(), 'David Kim', 'david-kim', 'DevOps Specialist', 'David is a DevOps specialist with expertise in containerization and CI/CD pipelines.', '/images/person-4.jpg'),
  (uuid_generate_v4(), 'Alex Chen', 'alex-chen', 'Frontend Developer', 'Alex is a frontend developer passionate about creating beautiful and accessible user interfaces.', '/images/person-5.jpg');

-- Insert tags
INSERT INTO tags (id, name, slug) VALUES
  (uuid_generate_v4(), 'JavaScript', 'javascript'),
  (uuid_generate_v4(), 'TypeScript', 'typescript'),
  (uuid_generate_v4(), 'React', 'react'),
  (uuid_generate_v4(), 'Next.js', 'nextjs'),
  (uuid_generate_v4(), 'Node.js', 'nodejs'),
  (uuid_generate_v4(), 'AI', 'ai'),
  (uuid_generate_v4(), 'DevOps', 'devops'),
  (uuid_generate_v4(), 'Cloud', 'cloud'),
  (uuid_generate_v4(), 'Web Development', 'web-development');

-- Get IDs for relationships
DO $$
DECLARE
  guide_id UUID;
  interview_id UUID;
  analysis_id UUID;
  sarah_id UUID;
  michael_id UUID;
  emily_id UUID;
  typescript_id UUID;
  react_id UUID;
  ai_id UUID;
BEGIN
  -- Get category IDs
  SELECT id INTO guide_id FROM categories WHERE slug = 'guide';
  SELECT id INTO interview_id FROM categories WHERE slug = 'interview';
  SELECT id INTO analysis_id FROM categories WHERE slug = 'analysis';
  
  -- Get author IDs
  SELECT id INTO sarah_id FROM authors WHERE slug = 'sarah-johnson';
  SELECT id INTO michael_id FROM authors WHERE slug = 'michael-roberts';
  SELECT id INTO emily_id FROM authors WHERE slug = 'emily-parker';
  
  -- Get tag IDs
  SELECT id INTO typescript_id FROM tags WHERE slug = 'typescript';
  SELECT id INTO react_id FROM tags WHERE slug = 'react';
  SELECT id INTO ai_id FROM tags WHERE slug = 'ai';
  
  -- Insert articles
  INSERT INTO articles (id, title, slug, excerpt, content, featured, published, category_id, author_id, image_url, published_at) VALUES
    (
      uuid_generate_v4(),
      'Mastering TypeScript: Advanced Type System Features',
      'mastering-typescript-advanced-type-system',
      'Learn how to leverage TypeScript''s advanced type system features to write more robust and maintainable code.',
      '<p>TypeScript has become an essential tool for modern web development, offering static typing and powerful features that help catch errors before runtime. In this comprehensive guide, we''ll explore some of the more advanced type system features that can take your TypeScript skills to the next level.</p><h2>Union and Intersection Types</h2><p>Union types allow a value to be one of several types, while intersection types combine multiple types into one. These powerful features enable you to model complex data structures with precision.</p><pre><code>// Union type example
type Status = "pending" | "approved" | "rejected";

// Intersection type example
type Employee = Person & { employeeId: string; department: string };</code></pre><h2>Conditional Types</h2><p>Conditional types allow you to create types that depend on other types, similar to if statements in regular programming.</p><pre><code>type NonNullable<T> = T extends null | undefined ? never : T;</code></pre><h2>Mapped Types</h2><p>Mapped types allow you to create new types based on existing ones by transforming properties in some way.</p><pre><code>type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};</code></pre><p>By mastering these advanced features, you''ll be able to create more expressive, safer, and maintainable TypeScript code.</p>',
      true,
      true,
      guide_id,
      alex_id,
      '/images/spotlight-1.jpg',
      NOW() - INTERVAL '1 day'
    ),
    (
      uuid_generate_v4(),
      'Inside Vercel''s Engineering Culture with Their Lead Architect',
      'inside-vercels-engineering-culture',
      'An exclusive interview with Vercel''s lead architect on their engineering culture, technical decisions, and future plans.',
      '<p>In this exclusive interview, we sit down with Vercel''s lead architect to discuss the company''s engineering culture, technical decisions, and future plans. Vercel has become a leading platform for frontend developers, and their approach to engineering has played a significant role in their success.</p><h2>On Engineering Culture</h2><p>"Our engineering culture is built around three core principles: simplicity, performance, and developer experience," explains the lead architect. "We believe that by focusing on these principles, we can create tools and platforms that genuinely improve the way developers work."</p><h2>Technical Decisions</h2><p>When asked about the technical decisions that have shaped Vercel''s products, the lead architect highlights the importance of embracing the Edge. "Moving computation closer to users through edge functions has been transformative. It''s not just about performance—it''s about enabling new types of applications that weren''t possible before."</p><h2>Future Plans</h2><p>Looking to the future, Vercel is focused on further improving the developer experience. "We''re working on tools that make it even easier to build, test, and deploy web applications. We want to remove as much friction as possible from the development process."</p><p>This interview provides valuable insights into the engineering mindset behind one of the most influential companies in web development today.</p>',
      true,
      true,
      interview_id,
      emily_id,
      '/images/spotlight-2.jpg',
      NOW() - INTERVAL '2 days'
    ),
    (
      uuid_generate_v4(),
      'The State of Web Development in 2025: Trends and Predictions',
      'state-of-web-development-2025',
      'An analysis of the current state of web development and predictions for where the industry is heading in the coming years.',
      '<p>As we move through 2025, the web development landscape continues to evolve at a rapid pace. In this analysis, we''ll explore the current state of web development and make predictions about where the industry is heading.</p><h2>Current Trends</h2><p>Several key trends are currently shaping web development:</p><ul><li><strong>AI-assisted development</strong> has become mainstream, with tools that can generate code, optimize performance, and even design user interfaces.</li><li><strong>Edge computing</strong> has transformed application architecture, with more logic running closer to users.</li><li><strong>WebAssembly</strong> has expanded beyond its initial use cases and is now powering complex applications that previously required native code.</li></ul><h2>Predictions for the Future</h2><p>Looking ahead, we anticipate several developments:</p><ol><li>The line between web and native applications will continue to blur, with web apps gaining more capabilities previously reserved for native apps.</li><li>AI will move from being an assistant to a collaborator in the development process, with more sophisticated understanding of developer intent.</li><li>New frameworks will emerge that are designed from the ground up for AI-assisted development, optimizing for the strengths and limitations of AI coding assistants.</li></ol><p>The web development field remains as dynamic as ever, with new technologies and approaches constantly emerging. Staying adaptable and continuing to learn will be key for developers in this evolving landscape.</p>',
      true,
      true,
      analysis_id,
      michael_id,
      '/images/spotlight-3.jpg',
      NOW() - INTERVAL '3 days'
    );
    
  -- Get article IDs for tags
  DECLARE
    typescript_article_id UUID;
    vercel_article_id UUID;
    trends_article_id UUID;
  BEGIN
    SELECT id INTO typescript_article_id FROM articles WHERE slug = 'mastering-typescript-advanced-type-system';
    SELECT id INTO vercel_article_id FROM articles WHERE slug = 'inside-vercels-engineering-culture';
    SELECT id INTO trends_article_id FROM articles WHERE slug = 'state-of-web-development-2025';
    
    -- Insert article tags
    INSERT INTO article_tags (article_id, tag_id) VALUES
      (typescript_article_id, typescript_id),
      (vercel_article_id, react_id),
      (vercel_article_id, typescript_id),
      (trends_article_id, ai_id),
      (trends_article_id, react_id);
  END;
END $$;
